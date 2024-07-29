import React, { Suspense } from "react";
import Image from "next/image";
import clsx from "clsx";
import ReactCountryFlag from "react-country-flag";

const OsuProfileHeaderSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center backdrop-blur-lg">
      <div className="relative mb-10 flex aspect-[4/1] w-full flex-col items-center justify-center">
        <Image
          unoptimized
          src="/osu_repeatabl_pattern.png"
          alt="banner"
          fill
        />

        <div
          className={clsx(
            "border border-slate-700 flex items-center justify-center rounded-full w-34 h-34 drop-shadow-xl absolute left-16 p-1 overflow-hidden",
            "bg-slate-800 border-osuhub-dark-ice-blue"
          )}
        >
          <div
            className="h-[112px] w-[112px] rounded-full bg-slate-950 
       relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"

          />
        </div>
      </div>
      <div className="min:h-screen flex flex-col w-4/6 items-center gap-5 md:w-11/12 xl:w-4/6 xl:min-w-[1000px]">
        <div className="flex w-full justify-between">
          <div className="relative">
            <h1 className="text-6xl font-bold">
              Username
            </h1>
            <div className="absolute -right-8 -top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 shadow-lg">
              <ReactCountryFlag
                cdnUrl="https://flagcdn.com/"
                cdnSuffix="svg"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                }}
                svg
                countryCode="US"
              />
            </div>
          </div>
          <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="flex w-full flex-row">
          {/* Block left */}
          <div className="flex w-1/2 flex-col gap-4">
            <h3>
              Supporter Status
            </h3>

            <div className="w-60 flex flex-col items-start justify-center">
              <div className="text-xl font-bold">Level:</div>
              <div className="text-2xl font-bold">50</div>
            </div>
            <div className="flex w-60 flex-col ">
              <div className="text-xl font-bold">Global rank</div>
              <h2 className="text-start text-yellow-400">
                <small>#</small>1234
              </h2>
            </div>
          </div>
          {/* Block right */}
          <div className="flex w-1/2 flex-col items-end justify-between">
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <div className="w-40 text-sm font-semibold uppercase tracking-wide text-indigo-500">
                  Playtime
                </div>
                <div className="text-2xl font-semibold">
                  <span>10D </span>
                  <span>5H </span>
                  <span>30M </span>
                  <span>20S</span>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold">Country rank</div>
                <h2>
                  <small>#</small>56
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="m-4 h-80 w-full md:w-[640px] xl:min-w-[1000px] rounded-2xl bg-slate-950 
       relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          {/* Placeholder for rank history chart */}
        </div>
        <div className="m-4 flex rounded-md bg-slate-950 
       relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          
        </div>
        <div className="w-full  h-48 rounded-2xl bg-slate-950 
       relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          {/* Placeholder for user stats */}
        </div>

        <div className="w-full  h-48 rounded-2xl bg-slate-950 
       relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          {/* Placeholder for user page HTML */}
        </div>
      </div>

      <Suspense fallback={<div>getting Medals...</div>}>
        <div className="w-[257px]  h-48 rounded-2xl bg-slate-950 
       relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
          {/* Placeholder for user medals */}
        </div>
      </Suspense>
    </div>
  );
};

export default OsuProfileHeaderSkeleton;
