import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { getPercentiles } from "@/lib/calculateUserBeatmapAd";

export const predictionRouter = createTRPCRouter({
  getTotalPredictions: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.prediction.count();
  }),
  byId: protectedProcedure
    .input(
      z.object({
        predictionId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.prediction.findFirst({
        where: { id: input.predictionId },
        include: {
          mods_prediction: {
            include: {
              acc_prediction: true,
            },
          },
        },
      });

      return res;
    }),
  byIdWithMods: protectedProcedure
    .input(
      z.object({
        beatmapId: z.number(),
        mods: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.prediction.findMany({
        where: {
          beatmap_id: input.beatmapId,
        },
        include: {
          mods_prediction: {
            where: {
              mods: input.mods,
            },
            include: {
              acc_prediction: true,
            },
          },
        },
      });
    }),

  recommendation: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        lower_pp: z.optional(z.number()),
        upper_pp: z.optional(z.number()),
        lower_acc: z.optional(z.number()),
        upper_acc: z.optional(z.number()),
        lower_star: z.optional(z.number()),
        upper_star: z.optional(z.number()),
        lower_ar: z.optional(z.number()),
        upper_ar: z.optional(z.number()),
        lower_od: z.optional(z.number()),
        upper_od: z.optional(z.number()),
        lower_cs: z.optional(z.number()),
        upper_cs: z.optional(z.number()),
        lower_hp: z.optional(z.number()),
        upper_hp: z.optional(z.number()),
        lower_duration: z.optional(z.number()),
        upper_duration: z.optional(z.number()),
        lower_bpm: z.optional(z.number()),
        upper_bpm: z.optional(z.number()),
        sort_for_latest: z.optional(z.boolean()),
        sort_for_animie: z.optional(z.boolean()),
        mods: z.optional(z.number()),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log(input.mods);
      const limit = input.limit ?? 6;
      const cursor = input.cursor ?? 0;
      const res = await ctx.db.prediction.findMany({
        take: limit + 1,

        cursor: cursor ? { id: cursor } : undefined,
        where: {
          id: { gte: cursor },
          mode: 0,

          beatmapset: {
            genre_name: input.sort_for_animie
              ? {
                  startsWith: "Anime",
                }
              : undefined,

            duration: {
              gte: input.lower_duration ?? 0,
              lte: input.upper_duration ?? 1000,
            },
          },
          mods_prediction: {
            some: {
              mods: input.mods ?? undefined,
              stars: {
                gte: input.lower_star ?? 0,
                lte: input.upper_star ?? 15,
              },
              ar: { gte: input.lower_ar ?? 0, lte: input.upper_ar ?? 15 },
              od: { gte: input.lower_od ?? 0, lte: input.upper_od ?? 15 },
              cs: { gte: input.lower_cs ?? 0, lte: input.upper_cs ?? 15 },
              hp: { gte: input.lower_hp ?? 0, lte: input.upper_hp ?? 15 },
              bpm: { gte: input.lower_bpm ?? 0, lte: input.upper_bpm ?? 400 },
              acc_prediction: {
                some: {
                  pp: { gte: input.lower_pp ?? 0, lte: input.upper_pp ?? 3000 },
                  acc: {
                    gte: input.lower_acc ?? 0,
                    lte: input.upper_acc ?? 101,
                  },
                },
              },
            },
          },
        },
        include: {
          beatmapset: true,
          mods_prediction: {
            include: {
              acc_prediction: true,
            },
            where: {
              mods: input.mods ?? undefined,
              stars: {
                gte: input.lower_star ?? 0,
                lte: input.upper_star ?? 15,
              },
              ar: { gte: input.lower_ar ?? 0, lte: input.upper_ar ?? 15 },
              od: { gte: input.lower_od ?? 0, lte: input.upper_od ?? 15 },
              cs: { gte: input.lower_cs ?? 0, lte: input.upper_cs ?? 15 },
              hp: { gte: input.lower_hp ?? 0, lte: input.upper_hp ?? 15 },
              bpm: { gte: input.lower_bpm ?? 0, lte: input.upper_bpm ?? 400 },
              acc_prediction: {
                some: {
                  pp: { gte: input.lower_pp ?? 0, lte: input.upper_pp ?? 3000 },
                  acc: {
                    gte: input.lower_acc ?? 0,
                    lte: input.upper_acc ?? 101,
                  },
                },
              },
            },
          },
        },
        orderBy: [
          {
            id: "asc",
          },

          { last_update: input.sort_for_latest ? "desc" : undefined },
        ],

        // skip: 1,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (res.length > limit) {
        const nextItem = res.pop();
        nextCursor = Number(nextItem!.id);
      }
      return {
        res,
        nextCursor,
      };
    }),

  getPlayerBeatmapPredictions: protectedProcedure
    .input(
      z.object({
        player_id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result_best_scores = await ctx.db.userscore.findMany({
        select: { beatmap_id: true, mods: true, pp: true, accuracy: true },
        where: {
          osu_user_id: input.player_id,
          type: "score_best_osu",
        },
        orderBy: {
          pp: "desc",
        },
      });
      if (!result_best_scores ?? result_best_scores.length === 0) {
        return null;
      }
      const arr_pp = result_best_scores.map((score) => score.pp);
      const arr_acc = result_best_scores.map((score) =>
        score.accuracy ? score.accuracy * 100 : null,
      );

      const mapdata = result_best_scores.map(async (data) => {
        if (!data.beatmap_id || !data.mods) {
          return null;
        }
        const query2 = await ctx.db.prediction.findFirst({
          where: { beatmap_id: data.beatmap_id },
          include: {
            beatmapset: {
              select: {
                duration: true,
              },
            },
            mods_prediction: {
              where: { beatmap_id: data.beatmap_id, mods: data.mods },
            },
          },
        });
        return query2;
      });
      const da = await Promise.all(mapdata);
      const pp = getPercentiles(arr_pp);
      const acc = getPercentiles(arr_acc);
      const od = getPercentiles(
        da.map((data) => data?.mods_prediction[0]?.od ?? 0),
      );
      const cs = getPercentiles(
        da.map((data) => data?.mods_prediction[0]?.cs ?? 0),
      );
      const ad = getPercentiles(
        da.map((data) => data?.mods_prediction[0]?.ar ?? 0),
      );
      const bpm = getPercentiles(
        da.map((data) => data?.mods_prediction[0]?.bpm ?? 0),
      );
      const hp = getPercentiles(
        da.map((data) => data?.mods_prediction[0]?.hp ?? 0),
      );
      const duration = getPercentiles(da.map((data) => data?.duration ?? 0));
      const star = getPercentiles(
        da.map((data) => data?.mods_prediction[0]?.stars ?? 0),
      );

      return {
        pp,
        acc,
        od,
        cs,
        ad,
        bpm,
        hp,
        duration,
        star,
      };
    }),
});
export type PredictionRouter = typeof predictionRouter;
