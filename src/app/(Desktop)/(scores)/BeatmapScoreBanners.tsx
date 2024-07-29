import { score_types } from "@/lib/getUserRecentGames";
import { Suspense } from "react";
import { SkeltonCardBeatmapsetBanner } from "@/app/_components/UI/SkeltonCardBeatmapsetBanner";
import { PaginationLink } from "@/app/_components/UI/PaginationLink";
import QuerySearchParamsUpdate from "./QuerySearchParamsUpdate";
import { Headline } from "@/app/_components/UI/Typography/Headline";

import { StatsBubbleSkeleton } from "@/app/_components/Profile/UserStats/StatsBubble";
import HighestScoreFromTodayComponent from "./HighestScoreFromTodayComponent";
import UserScoresComponent from "./UserScoresComponent";

const BeatmapScoreBanners = ({
  osu_user_id,
  scoretype = [score_types.score_osu, score_types.score_best_osu, "solo_score"],
  skip,
  limit,
  is_passed,
  is_perfect,
  page = 1,
  totalScores,
}: {
  is_passed: boolean | undefined;
  is_perfect: boolean | undefined;
  scoretype?: string[];
  page?: number;
  skip: number;
  limit: number;
  osu_user_id: number;
  totalScores: number;
}) => {
  const fakeArray = [...Array(limit).keys()];
  return (<>
    <div className="flex text-2xl max-w-5xl flex-col w-full text-white">
      <div className="pb-8 flex flex-row justify-between items-end">
        <Headline headlineNumber={1} >Latest Scores </Headline>
        <Headline headlineNumber={2}> {totalScores} Scores</Headline>
      </div>
      <Suspense fallback={<StatsBubbleSkeleton />}>
        <HighestScoreFromTodayComponent osu_user_id={osu_user_id} />
      </Suspense>
      <Suspense fallback={<StatsBubbleSkeleton />}>
        <HighestScoreFromTodayComponent osu_user_id={osu_user_id} />
      </Suspense>
      <QuerySearchParamsUpdate />
    </div>
    <div className="flex font-exo w-full flex-wrap  min-h-[800px] items-center justify-center gap-8 sm:w-11/12 ">
      <Suspense
        fallback={
          fakeArray.map((i) => (
            <SkeltonCardBeatmapsetBanner key={i} width={896} height={464} isLoading={true} />
          ))
        }
      >
        <UserScoresComponent osu_user_id={osu_user_id} is_passed={is_passed} scoretype={scoretype} is_perfect={is_perfect} skip={skip} limit={limit} />
      </Suspense>
    </div>

    <div className="flex py-10 px-12 border border-slate-500 bg-osuhub-gray my-12 rounded-xl items-center">
      {/* <UserDataLoaded osu_user_id={osu_user_id} length={0} /> */}
      <PaginationLink total={Math.ceil(totalScores / limit)} cursor={page} />
    </div>
  </>
  );
};

export default BeatmapScoreBanners;
