import { userRouter } from "@/server/api/routers/user";
import { scoreRouter } from "@/server/api/routers/score";
import { beatmapsetRouter } from "@/server/api/routers/beatmapset";
import { createTRPCRouter } from "@/server/api/trpc";
import { beatmapRouter } from "./routers/beatmap";
import { predictionRouter } from "./routers/prediction";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  score: scoreRouter,
  beatmapset: beatmapsetRouter,
  prediction: predictionRouter,
  beatmap: beatmapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
