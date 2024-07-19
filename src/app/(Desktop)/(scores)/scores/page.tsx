import { redirect } from "next/navigation";
import { getUserIdFromParams } from "@/utils/getUserIdFromParamsAndSession";
import BeatmapScoreBanners from "../BeatmapScoreBanners";
import { env } from "@/env.mjs";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import { updateUser } from "@/actions";

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
  if (session)
    if ((await api.user.getUserRole.query()) === "user") return redirect("/")
  const osu_user_id: number = getUserIdFromParams(session, params);

  if (searchParams?.page !== null && searchParams?.page !== undefined) {
    skip = Number(searchParams.page) * limit;
  }
  const page = searchParams?.page ? Number(searchParams.page) : 0;

  await updateUser(session.user.osu_user_id)
  return (
    <section className="flex h-screen w-full flex-col items-center overflow-y-auto">
      <BeatmapScoreBanners
        scoretype={searchParams?.score_type}
        limit={limit}
        skip={skip}
        page={page}
        osu_user_id={osu_user_id}
        is_passed={searchParams?.is_passed ? Number(searchParams.is_passed) == 1 : undefined}
        is_perfect={searchParams?.is_perfect ? Number(searchParams.is_perfect) == 1 : undefined}
        is_new={session?.user?.is_new}

      />
    </section>
  );
};
export default DashboardPage;
