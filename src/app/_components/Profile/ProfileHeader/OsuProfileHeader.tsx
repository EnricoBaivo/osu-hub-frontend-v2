
import React from "react";
import Image from "next/image";
import ChartContainer from "../RankHeighestChart/ChartContainer";
import SupporterHearts from "../Supporter/SupporterHearts";
import UserStats from "../UserStats/UserStats";
import clsx from "clsx";

import { seconds_to_DHMS } from "@/utils/date_calculations";
import ReactCountryFlag from "react-country-flag";
import UserGradeCounts from "../UserGradeCounts/UserGradeCounts";
import TextHeadline from "../../UI/TextHeadline";

import Progressbar from "../../UI/Progressbar/Progressbar";
import UserPageHtml from "../../UI/UserPageHtml";
import { api } from "@/trpc/server";


const PlayTime = ({
  playtime,
}: {
  playtime: { days: number; hours: number; minutes: number; seconds: number };
}) => {
  return (
    <div>
      <div className="w-40 text-sm font-semibold uppercase tracking-wide text-indigo-500">
        Playtime
      </div>
      <div className="text-2xl font-semibold">
        <span>{playtime.days}D </span>
        <span>{playtime.hours}H </span>
        <span>{playtime.minutes}M </span>
        <span>{playtime.seconds}S</span>
      </div>
    </div>
  );
};
const OsuProfileHeader = async ({ osu_user_id }: { osu_user_id: number }) => {
  const user = await api.user.userProfile.query({
    osu_user_id: osu_user_id,
  });

  //  destructure data
  const userStats = user?.statistics

  const userGradeCounts = userStats?.grade_counts ?? {
    id: 0, ss: 0, ssh: 0, s: 0, sh: 0, a: 0
  };

  const user_page = user?.page as { html: string, raw: string };
  const playtime = seconds_to_DHMS(Number(userStats?.play_time));


  const is_online = user?.is_online
    ? user.is_online
    : false;
  const avatar_url = user?.avatar_url
    ? user.avatar_url
    : "/default-avatar.png";






  const user_banner = user?.cover !== null && user?.cover.custom_url !== null ? user?.cover.custom_url : user?.cover?.url;
  const rankHistory = user?.rank_history

  return (
    <div className="flex w-full flex-col items-center backdrop-blur-lg">
      <div className="relative mb-10 flex aspect-[4/1] w-full flex-col items-center justify-center">

        <Image
          unoptimized
          src={user_banner ?? "/default-banner.png"}
          alt="banner"
          fill
        />

        <div
          className={clsx(
            "border border-slate-700 flex items-center justify-center rounded-full w-34 h-34 drop-shadow-xl absolute left-16 p-1 overflow-hidden",
            {
              " bg-slate-800  border-osuhub-dark-ice-blue":
                !is_online,
            },

            {
              "bg-green-400/60  backdrop-blur-3xl before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-green-100 before:to-transparent":
                is_online,
            },
          )}
        >
          <Image
            src={avatar_url}
            alt="avatar"
            className="rounded-full"
            width={112}
            height={112}
          />
        </div>
      </div>
      <div className="min:h-screen flex flex-col w-4/6 items-center gap-5 md:w-11/12 xl:w-4/6 xl:min-w-[1000px]">
        <div className="flex w-full justify-between">
          <div className="relative">
            <h1 className="text-6xl font-bold">
              {user?.username}
            </h1>
            {user?.country_code && (
              <div className="absolute -right-8 -top-5 flex h-9 w-9 items-center justify-center  rounded-full bg-slate-700 shadow-lg">
                <ReactCountryFlag
                  cdnUrl="https://flagcdn.com/"
                  cdnSuffix="svg"
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                  }}
                  svg
                  countryCode={user.country_code}
                />
              </div>
            )}
          </div>
          <SupporterHearts
            supporterLevel={Number(user?.support_level)}
          />
        </div>
        <div className="flex w-full flex-row">
          {/* Block left */}
          <div className="flex w-1/2 flex-col gap-4">
            <h3>
              {user?.is_supporter ? "A supporter uhh" : "Supporte Osu!"}
            </h3>

            <div className="w-60 flex flex-col items-start justify-center">
              <TextHeadline>
                Level:
              </TextHeadline>
              <Progressbar className="text-2xl" title={userStats?.level?.current.toString() ?? "0"} text={false} progress={(userStats?.level?.progress ?? 0) / 10} />
            </div>
            <div className="flex w-60 flex-col ">
              <TextHeadline>Globale rank</TextHeadline>
              <h2 className="text-start text-yellow-400 ">
                <small>#</small>
                {Number(userStats?.global_rank)}
              </h2>
            </div>
          </div>
          {/* Block right */}
          <div className="flex w-1/2 flex-col items-end justify-between ">
            <div className="flex h-full flex-col  justify-between gap-4">
              <div>
                <PlayTime playtime={playtime} />
              </div>
              <div>
                <TextHeadline>Country rank</TextHeadline>
                <h2>
                  <small>#</small>
                  {Number(userStats?.country_rank)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="m-4 h-80 w-full md:w-[640px]  xl:min-w-[1000px]">
          {rankHistory && (
            <ChartContainer rawData={rankHistory.data} />
          )}
        </div>
        <div className="m-4 flex rounded-md bg-slate-700 p-4 shadow-lg">
          {userGradeCounts && (
            <UserGradeCounts userGradeCounts={userGradeCounts} />
          )}
        </div>
        {userStats && <UserStats userStatsData={userStats} />}

        {user_page && <UserPageHtml html={user_page.html || user_page.raw} />}
      </div>
    </div>
  );
};

export default OsuProfileHeader;
