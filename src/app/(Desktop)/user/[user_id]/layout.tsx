import OsuProfileHeader from "@/app/_components/Profile/ProfileHeader/OsuProfileHeader";
import OsuProfileHeaderSkeleton from "@/app/_components/Profile/ProfileHeader/OsuProfileHeaderSkeleton";
import Footer from "@/app/_components/UI/Footer/Footer";
import { env } from "@/env.mjs";
import { auth } from "@/server/auth";
import { getUserIdFromParams } from "@/utils/getUserIdFromParamsAndSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  params?: Record<string, string>;
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect(env.TO_LOGIN_PAGE);
  }
  const osu_user_id: number = getUserIdFromParams(session, params);

  return (
      <main className="flex overflow-y-auto relative min-h-screen w-full flex-col items-center bg-gradient-to-b from-osuhub-dark-ice-grey to-osuhub-dark-ice-blue text-white">
        <Suspense fallback={<OsuProfileHeaderSkeleton />}>
          <OsuProfileHeader osu_user_id={osu_user_id} />
        </Suspense>
        {children}
        <Footer title="OSU HUB" />
      </main>
  );
}
