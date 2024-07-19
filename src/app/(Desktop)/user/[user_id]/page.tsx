import { redirect } from "next/navigation";
import { getUserIdFromParams } from "@/utils/getUserIdFromParamsAndSession";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { env } from "@/env.mjs";
import { updateUser } from "@/actions";
import BeatmapScoreBanners from "../../(scores)/BeatmapScoreBanners";

const DashboardPage = async ({
  params,
  searchParams,
}: {
  params?: { user_id: string };
  searchParams?: Record<string, string>;
}) => {
  let skip = 0;
  const limit = 8;
  const session = await auth();
  if (!session) return redirect(env.TO_LOGIN_PAGE);
  if (session)
    if ((await api.user.getUserRole.query()) === "user") return redirect("/")
  const osu_user_id: number = getUserIdFromParams(session, params);
  if (searchParams?.page !== null && searchParams?.page !== undefined) {
    skip = Number(searchParams.page) * limit;
  }
  let is_new = session?.user?.is_new ?? true;
  if (osu_user_id !== session?.user?.osu_user_id) {
    is_new = await api.user.isUserNew.query({ userId: osu_user_id })
  }
  await updateUser(session.user.osu_user_id)

  const page = searchParams?.page ? Number(searchParams.page) : 0;
  console.log(searchParams?.score_type)
  return (
    <BeatmapScoreBanners
      scoretype={searchParams?.score_type}
      limit={limit}
      skip={skip}
      page={page}
      osu_user_id={osu_user_id}
      is_passed={searchParams?.is_passed ? Number(searchParams.is_passed) == 1 : undefined}
      is_perfect={searchParams?.is_perfect ? Number(searchParams.is_perfect) == 1 : undefined}
      is_new={is_new}
    />
  );
};
export default DashboardPage;
