import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AnimeResponse } from "@/types/aniListMediaInterface";
import { z } from "zod";

export const beatmapsetRouter = createTRPCRouter({
  getAniListMedia: protectedProcedure
    .input(
      z.object({
        beatmapset_id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const anilist = await ctx.db.animie_reference.findFirst({
        where: {
          beatmapset: {
            some: {
              id: input.beatmapset_id,
            },
          },
        },
        include: {
          beatmapset: {
            select: {
              id: true,
              title: true,
              creator: true,
              
            },
          },
        },
      });
      const query = `
        query ($id: Int) { 
            Media(id: $id, type: ANIME) {
                id
                episodes
                status
                recommendations {
                    edges {
                        node {
                            mediaRecommendation {
                                title {
                                    romaji
                                    english
                                    native
                                    userPreferred
                                }
                                siteUrl
                                coverImage {
                                    extraLarge
                                    large
                                    color
                                }
                            }
                        }
                    }
                }
                genres
                rankings {
                    type
                    rank
                    context
                    format
                    year
                    season
                    allTime
                }
                tags {
                    name
                    rank
                }
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                siteUrl
                description
                trailer {
                    id
                    thumbnail
                }
                coverImage {
                    extraLarge
                    large
                    color
                }
            }
        }
    `;

      const variables = { id: anilist?.id };

      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const animeResponse: AnimeResponse = await response.json();

        const data ={
          beatmapsets: anilist?.beatmapset,
          ...animeResponse,
        }
        return data;
      } catch (error) {}
    }),
    hasAniList: protectedProcedure
    .input(
      z.object({
        beatmapset_id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const anilist = await ctx.db.animie_reference.findFirst({
        where: {
          beatmapset: {
            some: {
              id: input.beatmapset_id,
            },
          },
        },
      });
      return anilist !== null;
    }),
});
export type UserPrediction = {
  pp: Record<string, number | null>;
  acc: Record<string, number | null>;
  star: Record<string, number | null>;
  ad: Record<string, number | null>;
  od: Record<string, number | null>;
  cs: Record<string, number | null>;
  hp: Record<string, number | null>;
  bpm: Record<string, number | null>;
  duration: Record<string, number | null>;
};

export type BeatmapRecommendationState = {
  userPredictions: UserPrediction | null;
  beatmapset_id: number;
  beatmap_id: number;
  beatmapArtist: string;
  beatmapVersion: string;
  beatmapsetTitle: string;
  beatmapsetCreator: string;
  beatmapsetMode: number;
  beatmapHasPredictions: boolean;
  sortForLatest: boolean;
  duration: [number, number];
};
