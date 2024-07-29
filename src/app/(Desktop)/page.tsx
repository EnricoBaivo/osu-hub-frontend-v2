
import Link from "next/link";

import { api } from "@/trpc/server";

import RandomOsuHubBackground from "@/app/_components/UI/RandomOsuHubBackground/RandomOsuHubBackground";
import { auth } from "@/server/auth";
import { FaDiscord } from "react-icons/fa";
import { Headline } from "@/app/_components/UI/Typography/Headline";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }
  const secret_massage = await api.user.getSecretMessage.query()
  let userRole = "Your on the way";
  if (session?.user.is_alpha_tester) userRole = "Alpha tester";
  if (session?.user.is_beta_tester) userRole = "Beta tester";
  if (session?.user.is_admin) userRole = "Admin";

  return <main className="flex filter-{blur(15px)} relative h-full w-full flex-col items-center justify-center bg-gradient-to-b from-osuhub-dark-ice-grey to-osuhub-dark-ice-blue text-white">
    <div className="container flex flex-col  items-center justify-center gap-8 px-4  ">
      <RandomOsuHubBackground />
      <div className="z-10 backdrop-blur-xl p-16 rounded-4xl bg-osuhub-dark-ice-blue flex flex-col ">
        <div className="mb-8">
          <p className="text-3xl  lg:text-6xl drop-shadow-sm text-white">
            Welcome to
          </p>
          <h1 className="text-2xl lg:text-9xl drop-shadow-sm font-extrabold tracking-tight sm:text-[5rem]">
            osu! <span className="text-[hsl(280,100%,70%)]">HUB</span>
          </h1>
        </div>
        <div className="flex flex-col items-center gap-2">

          {session && <div className="flex flex-col items-center justify-center gap-2">
            <Headline headlineNumber={2} classNames="inline-block ">
              {userRole} <span className="text-center font-semibold text-3xl text-white">
                {secret_massage}
              </span>
            </Headline>

            <Link target="_blank" className="w-72 h-20 gap-1 text-2xl uppercase font-black my-12 hover:scale-110 transition-all flex flex-row items-center justify-around px-4 py-2 text-indigo-500 hover:text-yellow-500 bg-osuhub-dark-ice-blue border rounded-md backdrop-blur-2xl " href={env.NEXT_PUBLIC_DISCORD_INVITE_LINK}>
              <span className="text-4xl">
                <FaDiscord />
              </span>
              <span >{(session?.user?.is_admin) ?? (session?.user?.is_alpha_tester) ?? (session?.user?.is_beta_tester) ? "Improve us" : "alpha access"}</span>
            </Link>
          </div>
          }
          <Link
            href={session ? "/api/auth/signout" : "/auth/login"}
            className="rounded-full bg-osuhub-dark-ice-blue px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </div>
  </main >
    ;
}