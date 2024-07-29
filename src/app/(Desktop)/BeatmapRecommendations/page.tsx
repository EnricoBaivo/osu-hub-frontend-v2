import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import { Headline } from "../../_components/UI/Typography/Headline";
import UserDataLoaded from "../../_components/UserDataLoaded/UserDataLoaded";
import { updateUser } from "@/actions";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";
import { Suspense } from "react";
import PredictionsCounterComponent from "./PredictionsCounterComponent";
import UserBeatmapRecommendations from "./UserBeatmapRecommendations";

export default async function BeatmapsetSearchToolPage() {
  const session = await auth();
  if (!session?.user?.osu_user_id) return redirect(env.TO_LOGIN_PAGE);
  updateUser(session.user.osu_user_id)


  return (<div className="relative flex flex-col w-full items-center overflow-auto h-full ">
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <Headline >Beatmapset Recommendations</Headline>
      <Suspense fallback={
        <h2 className="text-lg text-gray-300">We got you, __ predictions 🔮</h2>
      }>
        <PredictionsCounterComponent />
      </Suspense>
    </div >

    <Suspense fallback={<h2>Loading...</h2>}>
      <UserBeatmapRecommendations osu_user_id={session?.user?.osu_user_id} />
    </Suspense>
  </div >
  )
}

