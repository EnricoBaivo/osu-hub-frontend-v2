import { getUserIdFromParams } from "@/utils/getUserIdFromParamsAndSession";
import BeatmapScoreBanners from "../BeatmapScoreBanners";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import { updateUser } from "@/actions";
import { score_types } from "@/lib/getUserRecentGames";
import { redirect } from "next/navigation";
import { env } from "@/env.mjs";

const DashboardPage = async ({
  params,
  searchParams,
}: {
  params?: { user_id: string };
  searchParams?: Record<string, string>;
}) => {
  let skip = 0;
  const limit = 6;
  const session = await auth();
  if (!session) return redirect(env.TO_LOGIN_PAGE);

  const osu_user_id: number = getUserIdFromParams(session, params);
  updateUser(session.user.osu_user_id)
  if (searchParams?.page !== null && searchParams?.page !== undefined) {
    skip = Number(searchParams.page) * limit;
  }
  const page = searchParams?.page ? Number(searchParams.page) : 0;

  let scoretype = searchParams?.score_type;
  let scoreTypeList: string[] = []
  if (scoretype === "score_osu") {
    scoreTypeList = [score_types.score_osu, score_types.score_best_osu, "solo_score"]
  }
  else if (typeof scoretype === "string") {
    scoreTypeList = [scoretype];
  } else {
    scoreTypeList = [score_types.score_osu, score_types.score_best_osu, "solo_score"]
  }
  const totalScores = await api.score.userTotalScoresCount.query({
    user_id: osu_user_id,
    only_perfect: searchParams?.is_perfect ? Number(searchParams.is_perfect) == 1 : undefined,
    scoretype: scoreTypeList,
    is_passed: searchParams?.is_passed ? Number(searchParams.is_passed) == 1 : undefined,
  });
  return (
    <section className="flex h-screen w-full flex-col items-center overflow-y-auto">
      <BeatmapScoreBanners
        totalScores={totalScores}
        scoretype={scoreTypeList}
        limit={limit}
        skip={skip}
        page={page}
        osu_user_id={osu_user_id}
        is_passed={searchParams?.is_passed ? Number(searchParams.is_passed) == 1 : undefined}
        is_perfect={searchParams?.is_perfect ? Number(searchParams.is_perfect) == 1 : undefined}

      />
    </section>
  );
};
export default DashboardPage;
