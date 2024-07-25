import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Client, isOsuJSError, UserExtended } from "osu-web.js";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  userFriends: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.account.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        access_token: true,
      },
    });
    if (!res?.access_token) return null;
    const client = new Client(res.access_token);
    try {
      const friends = await client.getUndocumented<UserExtended[]>("friends");

      return friends;
    } catch (err) {
      console.log("hää", err);
      return null;
    }
  }),
  userProfile: protectedProcedure
    .input(z.object({ osu_user_id: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.account.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          access_token: true,
        },
      });
      if (!res?.access_token) return null;
      const client = new Client(res.access_token);

      try {
        const user = await client.users.getUser(input.osu_user_id, {
          urlParams: {
            mode: "osu",
          },
        });
        await ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            is_online: user.is_online,
            updatedAt: new Date(),
          },
        });
        return user;
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
      }
    }),
  // protected db put methods

  getOsuAccessToken: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.account.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        access_token: true,
      },
    });
    return res?.access_token;
  }),

  // protected db get methods

  getUserRole: protectedProcedure.query(async ({ ctx }) => {
    const fetchUser = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        is_admin: true,
        is_alpha_tester: true,
        is_beta_tester: true,
      },
    });
    if (fetchUser?.is_admin) {
      return "admin";
    } else if (fetchUser?.is_alpha_tester) {
      return "alpha_tester";
    } else if (fetchUser?.is_beta_tester) {
      return "beta_tester";
    } else {
      return "user";
    }
  }),
  getNewUsers: protectedProcedure
    .input(
      z.object({
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      }),
    )
    .query(async ({ ctx, input }) => {
      const fetchUser = await ctx.db.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          is_admin: true,
          is_new: true,
        },
      });
      if (fetchUser?.is_admin) {
        const limit = 15;
        const cursor = input.cursor;
        const res = await ctx.db.user.findMany({
          orderBy: {
            id: "asc",
          },

          where: {
            id: { gte: cursor ?? "" },
          },

          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if (res.length > limit) {
          const nextItem = res.pop();
          nextCursor = nextItem!.id;
        }
        return {
          res,
          nextCursor,
        };
      }else{
        return {
          res : [],
          nextCursor : null,
        };
      }
    }),
  grandAlphaTester: protectedProcedure
    .input(z.object({ userIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const fetchUser = await ctx.db.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        select: {
          is_admin: true,
          is_alpha_tester: true,
          is_beta_tester: true,
        },
      });
      if (fetchUser?.is_admin) {
        await ctx.db.user.updateMany({
          where: {
            id: {
              in: input.userIds,
            },
          },
          data: {
            is_alpha_tester: true,
          },
        });
        return true;
      } else {
        return false;
      }
    }),
  isUserNew: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ ctx, input }) => {
      const fetchUser = await ctx.db.user.findFirst({
        where: {
          id: input.userId.toString(),
        },
        select: {
          is_new: true,
        },
      });
      if (fetchUser?.is_new) {
        return true;
      } else {
        return false;
      }
    }),
  getSecretMessage: protectedProcedure.query(async ({ ctx }) => {
    const fetchUser = await ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },

      select: {
        is_admin: true,
        is_alpha_tester: true,
        is_beta_tester: true,
      },
    });
    if (fetchUser?.is_admin) {
      return ",  you are, hmm? Control, you have, over the galaxy of huge PP. Keep balance, you must, in the Force of early access.";
    } else if (fetchUser?.is_alpha_tester) {
      return ", you are, young padawan. Early birds, you fly with, to discover secrets of huge PP. Much to learn, you still have.";
    } else if (fetchUser?.is_beta_tester) {
      return ", you have become, hmmm? Test, you must, for the sake of huge PP. The path to mastery, this is, in the world of early access.";
    } else {
      return "Registered, you are, and your interest, we applaud, young one. The path to becoming an early tester, it shall reveal itself in due time. Await the right moment, you must. If eager, send a message to me, you should, to express your desire for the realm of huge PP and early access.";
    }
  }),
  getTotalUsers: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.count();
  }),
  updateOnlineStatus: protectedProcedure
    .input(z.object({ online: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          is_online: input.online,
        },
      });
      return true;
    }),
});
