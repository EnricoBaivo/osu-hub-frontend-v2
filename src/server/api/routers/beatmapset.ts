import { createTRPCRouter  } from "@/server/api/trpc";

export const beatmapsetRouter = createTRPCRouter({});
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
