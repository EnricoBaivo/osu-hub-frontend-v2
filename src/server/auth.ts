import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";

import { env } from "@/env.mjs";
import { PrismaAdapter } from "./PrismaAdapter";
import { db } from "./db/prismaClient";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      osu_user_id?: number | null;
      is_admin?: boolean | null;
      is_alpha_tester?: boolean | null;
      is_beta_tester?: boolean | null;
      is_new?: boolean | null;
      created_at?: Date | null;
      updated_at?: Date | null;
      last_login?: Date | null;
    } & DefaultSession["user"];
    error?: "RefreshAccessTokenError";
  }
}

export interface OsuUserCompact {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: string;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: Date | null;
  pm_friends_only: boolean;
  profile_colour: string | null;
  username: string;
}

export interface OsuProfile
  extends OsuUserCompact,
    Record<
      string,
      | string
      | boolean
      | Date
      | number
      | string[]
      | Record<string, number>
      | Record<string, string | number | null>
      | null
    > {
  discord: string | null;
  has_supported: boolean;
  interests: string | null;
  join_date: Date;
  kudosu: {
    available: number;
    total: number;
  };
  location: string | null;
  max_blocks: number;
  max_friends: number;
  occupation: string | null;
  playmode: string;
  playstyle: string[];
  post_count: number;
  profile_order: string[];
  title: string | null;
  title_url: string | null;
  twitter: string | null;
  website: string | null;
  country: {
    code: string;
    name: string;
  };
  cover: {
    custom_url: string | null;
    url: string;
    id: number | null;
  };
  is_restricted: boolean;
}
export const providerMap = [
  {
    id: "osuapi",
    name: "OSU!",
    type: "oauth",
    authorization: {
      url: "https://osu.ppy.sh/oauth/authorize",
      params: {
        scope: "public identify friends.read",
      },
    },
    clientId: env.OSU_CLIENT_ID,
    clientSecret: env.OSU_CLIENT_SECRET,
    token: "https://osu.ppy.sh/oauth/token",
    userinfo: "https://osu.ppy.sh/api/v2/me",
    profile(profile: OsuProfile) {
      // https://github.com/nextauthjs/next-auth/discussions/8758
      return {
        id: "osu_" + String(profile.id),
        name: profile.username,
        image: profile.avatar_url,
        osu_user_id: Number(profile.id),
        is_new: true,
        is_admin: false,
        is_alpha_tester: true,
        is_beta_tester: false,
      };
    },
  },
];

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: providerMap as [],
  pages: {
    signIn: "/auth/login",
  },
  debug: true,
  callbacks: {
    session: async ({ session, user }) => {
      const osu = await db.account.findFirst({
        select: {
          access_token: true,
          expires_at: true,
          refresh_token: true,
        },
        where: {
          userId: user.id,
        },
      });

      if (!osu) return session;

      if (
        (osu?.expires_at === null && osu?.refresh_token) ||
        (osu?.expires_at &&
          osu?.refresh_token &&
          osu?.expires_at * 1000 < Date.now())
      ) {
        // If the access token has expired, try to refresh it
        try {
          // We need the `token_endpoint`.
          const response = await fetch("https://osu.ppy.sh/oauth/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: env.OSU_CLIENT_ID,
              client_secret: env.OSU_CLIENT_SECRET,
              grant_type: "refresh_token",
              refresh_token: osu.refresh_token,
            }),
            method: "POST",
          });
          const tokens = (await response.json()) as Tokens;
          if (!response.ok) throw tokens;

          await db.account.update({
            where: {
              userId: user.id,
            },
            data: {
              access_token: tokens.access_token,
              expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
              refresh_token: tokens.refresh_token,
            },
          });
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          session.error = "RefreshAccessTokenError";
        }
      }
      return {
        ...session,
        user: {
          ...user,
        },
      };
    },
    signIn: async ({ user }) => {
      const last_login = new Date().toISOString();
      console.log("last_login", last_login);
      const userExists = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });
      if (userExists) {
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: last_login,
          },
        });
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

interface Tokens {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

declare module "@auth/core/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
