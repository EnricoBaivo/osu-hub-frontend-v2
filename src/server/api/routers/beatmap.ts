import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { Client, isOsuJSError } from "osu-web.js";

export const beatmapRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(
      z.object({
        beatmapId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          access_token: true,
        },
      });
      if (!res?.access_token) return;
      const client = new Client(res?.access_token);
      try {
        const data = await client.beatmaps.getBeatmap(input.beatmapId);
        return data;
      } catch (err) {
        if (isOsuJSError(err)) {
          // `err` is now of type `OsuJSError`

          if (err.type === "invalid_json_syntax") {
            // `err` is now of type `OsuJSGeneralError`
            console.error("Error while parsing response as JSON");
          } else if (err.type === "network_error") {
            // `err` is now of type `OsuJSGeneralError`
            console.error("Network error");
          } else if (err.type === "unexpected_response") {
            // `err` is now of type `OsuJSUnexpectedResponseError`

            /**
             * If using the fetch polyfill instead of the native fetch API, write:
             * `err.response(true)`
             * "true" means that it will return the Response type from "node-fetch" instead of the native Response
             */
            const response = err.response(); // Type: `Response`

            console.error("Unexpected response");
            console.log(`Details: ${response.status} - ${response.statusText}`);
            console.log("JSON: ", await response.json());
          }
        }
        return null;
      }
    }),
});
