import { score_types } from "@/lib/getUserRecentGames";
import { Suspense } from "react";
import { SkeltonCardBeatmapsetBanner } from "@/app/_components/UI/SkeltonCardBeatmapsetBanner";
import { PaginationLink } from "@/app/_components/UI/PaginationLink";
import { api } from "@/trpc/server";
import BeatmapScoreBanner from "./BeatmapScoreBanner";
import QuerySearchParamsUpdate from "./QuerySearchParamsUpdate";
import { Headline } from "@/app/_components/UI/Typography/Headline";

import StatsBubble from "@/app/_components/Profile/UserStats/StatsBubble";
import UserDataLoaded from "@/app/_components/UserDataLoaded/UserDataLoaded";

const BeatmapScoreBanners = async ({
  osu_user_id,
  scoretype = [score_types.score_osu, score_types.score_best_osu, "solo_score"],
  skip,
  limit,
  is_passed,
  is_perfect,
  page = 1,
  is_new
}: {
  is_passed: boolean | undefined;
  is_perfect: boolean | undefined;
  scoretype?: string[] | string;
  page?: number;
  skip: number;
  limit: number;
  osu_user_id: number;
  is_new?: boolean | null;
}) => {
  if (scoretype === "score_osu") { scoretype = [score_types.score_osu, score_types.score_best_osu, "solo_score"] }
  else if (typeof scoretype === "string") {
    scoretype = [scoretype];
  }



  const totalScores = await api.score.userTotalScoresCount.query({
    user_id: osu_user_id,
    only_perfect: is_perfect,
    scoretype: scoretype,
    is_passed: is_passed,
  });
  // avaible pages
  const pages = Math.ceil(totalScores / limit);

  const userScoresIdsData = await api.score.getUserScoresIds.query({
    is_passed: is_passed,
    scoretype: scoretype,
    user_id: osu_user_id,
    only_perfect: is_perfect,
    skip: skip,
    limit: limit,
  });
  const highestScore = await api.score.highestScoreFromDay.query({
    osuUserId: osu_user_id,
    day: 0,
  });
  const totalScoresForDay = await api.score.totalScoresForDay.query({
    user_id: osu_user_id,
    day: 0,
  });



  return (<div className="flex flex-col min-h-[800px] w-full">
    <div className="flex text-2xl max-w-5xl flex-col w-full text-white">
      <div className="pb-8 flex flex-row justify-between items-end">
        <Headline headlineNumber={1} >Latest Scores </Headline>
        <Headline headlineNumber={2}> {totalScores} Scores</Headline>
      </div>
      {highestScore && <StatsBubble title="Today Played:" data={totalScoresForDay} />}
      <StatsBubble title="Todays Highest Score:" data={highestScore ? highestScore.score : "Lets seee what you will reach today"} />
      <QuerySearchParamsUpdate />
    </div>
    <div className="flex font-exo w-full flex-wrap items-center justify-center gap-8 sm:w-11/12 ">

      {
        userScoresIdsData.map((score_id) => (
          <Suspense
            key={Number(score_id)}
            fallback={<SkeltonCardBeatmapsetBanner width={300} height={140} isLoading={true} />}
          >
            <BeatmapScoreBanner
              score_id={Number(score_id)}
            />
          </Suspense>
        ))
      }
    </div >
    <div className="flex py-10 px-12 border border-slate-500 bg-osuhub-gray my-12 rounded-xl items-center">
      <UserDataLoaded length={userScoresIdsData.length} is_new={is_new} />
      {userScoresIdsData.length > 1 && <PaginationLink total={pages} cursor={page} />}
    </div>
  </div>
  );
};

export default BeatmapScoreBanners;
