import { Suspense } from "react";
import StatsBubble from "./StatsBubble";
import type{ UserStatistics } from "osu-web.js";


const UserStats = ({ userStatsData }: { userStatsData: UserStatistics }) => {
  return (
    <div className="container flex flex-wrap justify-center">
      <Suspense fallback={<>loading...</>}>
        <StatsBubble
          title={"Total points on ranklist"}
          data={Number(userStatsData.ranked_score)}
        />
        <StatsBubble
          title={"Accuracy"}
          data={Number(userStatsData.hit_accuracy?.toFixed(2))}
        />
        <StatsBubble
          title={"Gamesplayed"}
          data={Number(userStatsData.play_count)}
        />
        <StatsBubble title={"Hits"} data={Number(userStatsData.total_hits)} />
        {Number(userStatsData.replays_watched_by_others) > 0 && (
          <StatsBubble
            title={"Watched replays by others"}
            data={Number(userStatsData.replays_watched_by_others)}
          />
        )}

        <StatsBubble title={"50 Hits"} data={Number(userStatsData.total_hits)} />
        <StatsBubble
          title={"100 Hits"}
          data={Number(userStatsData.count_100)}
        />
        <StatsBubble
          title={"300 Hits"}
          data={Number(userStatsData.count_300)}
        />
        <StatsBubble title={"Misses"} data={Number(userStatsData.count_miss)} />
        {Number(userStatsData.global_rank) > 0 && (
          <StatsBubble
            title={"Globalrank exp"}
            data={Number(userStatsData.global_rank)}
          />
        )}
        {Number(userStatsData.pp) > 0 && (
          <StatsBubble title={"PP exp"} data={Number(userStatsData.pp ? userStatsData.pp : 0).toFixed(2)} />
        )}
        <StatsBubble
          title={"Totalscore"}
          data={Number(userStatsData.total_score)}
        />
      </Suspense>
    </div>
  );
};
export default UserStats;
