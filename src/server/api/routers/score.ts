import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const scoreRouter = createTRPCRouter({
  // protected db get methods
  getLatestScores: protectedProcedure.query(async ({ ctx }) => {
    const scores = await ctx.db.userscore.findMany({
      orderBy: [{ created_at: "desc" }, { pp: { sort: "desc" } }],
      where: {
        passed: true,
        beatmapset: {
          status: "ranked",
          
        },
      },
      include: {
        beatmap: {
          select: {
            title: true,
            version: true,
          },
        },
      },
      take: 15,
    });
    const userScores = [];
    for (const score of scores) {
      const user_avatar = await ctx.db.user.findFirst({
        where: {
          osu_user_id: score.osu_user_id,
        },
      });
      userScores.push({
        ...score,
        avatar: user_avatar?.image,
        name: user_avatar?.name,
      });
    }
    return userScores;
  }),

  userTotalScoresCount: protectedProcedure
    .input(
      z.object({
        user_id: z.number(),
        is_passed: z.optional(z.boolean()),
        scoretype: z.array(z.string()),
        only_perfect: z.optional(z.boolean()),
        highest_acc: z.optional(z.number()),
        lowest_acc: z.optional(z.number()),
        highest_pp: z.optional(z.number()),
        lowest_pp: z.optional(z.number()),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.userscore.count({
        where: {
          osu_user_id: input.user_id,
          type: { in: input.scoretype },
          passed: input.is_passed,
          perfect: input.only_perfect,
          accuracy: { gte: input.highest_acc, lte: input.lowest_acc },
          pp: { gte: input.highest_pp, lte: input.lowest_pp },
        },
      });
    }),
  highestScoreFromDay: protectedProcedure
    .input(z.object({ osuUserId: z.number(), day: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - input.day);
      yesterday.setHours(0, 0, 0, 0);
      return await ctx.db.userscore.findFirst({
        where: {
          osu_user_id: input.osuUserId,
          created_at: {
            gte: yesterday,
            lt: new Date(yesterday.getTime() + 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { pp: "desc" },
      });
    }),

  totalScoresForDay: protectedProcedure
    .input(z.object({ user_id: z.number(), day: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - input.day);
      yesterday.setHours(0, 0, 0, 0);
      const res = await ctx.db.userscore.count({
        where: {
          osu_user_id: input.user_id,
          created_at: {
            gte: yesterday,
            lt: new Date(yesterday.getTime() + 24 * 60 * 60 * 1000),
          },
        },
      });
      return res;
    }),

  getUserScoresIds: protectedProcedure
    .input(
      z.object({
        user_id: z.number(),
        is_passed: z.optional(z.boolean()),
        scoretype: z.array(z.string()),
        only_perfect: z.optional(z.boolean()),
        skip: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.userscore.findMany({
        where: {
          osu_user_id: input.user_id,
          type: { in: input.scoretype },
          passed: input.is_passed,
          perfect: input.only_perfect,
        },
        select: {
          id: true,
        },
        orderBy: { created_at: "desc" },
        take: input.limit,
        skip: input.skip,
      });
      console.log(res[0]);
      return res.map((score) => Number(score.id));
    }),

  byId: protectedProcedure
    .input(
      z.object({
        score_id: z.number(),
      }),
    )

    .query(async ({ ctx, input }) => {
      const a = await ctx.db.userscore.findFirst({
        where: {
          id: input.score_id,
        },
        include: {
          score_statistic: true,
          score_weight: true,
        },
      });
      return a;
    }),
});
