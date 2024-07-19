import { api } from "@/trpc/server";
import BeatmapPredictionRecommendation from "./UserBeatmapRecommendations"
import { auth } from "@/server/auth";
import { Headline } from "../../_components/UI/Typography/Headline";
import UserDataLoaded from "../../_components/UserDataLoaded/UserDataLoaded";
import { updateUser } from "@/actions";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

export default async function BeatmapsetSearchToolPage() {
  const session = await auth();
  if (!session?.user?.osu_user_id) return redirect(env.TO_LOGIN_PAGE);


  const predictions = await api.prediction.getTotalPredictions.query();
  await updateUser(session.user.osu_user_id)
  const dat = await api.prediction.getPlayerBeatmapPredictions.query({ player_id: session.user.osu_user_id });
  return (<div className="relative flex flex-col  w-full items-center overflow-auto h-full ">
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <Headline >Beatmapset Recommendations</Headline>
      <h2 className="text-lg text-gray-300">We got you, {predictions} predictions 🔮</h2>
    </div>

    {dat ? <BeatmapPredictionRecommendation userPrediction={dat} /> : <UserDataLoaded length={0} is_new={session.user.is_new} />
    }
  </div>
  )
}

