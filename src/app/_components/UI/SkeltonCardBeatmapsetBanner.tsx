import clsx from "clsx";
import Image from "next/image";
export const SkeltonCardBeatmapsetBanner = ({
  isLoading = true,
  width = 1000,
  height = 700,
}: {
  isLoading?: boolean;
  width?: number | string;
  height?: number | string;

}) => (
  <div className={clsx(`relative flex w-[${width}px] min-h-[${height}px] rounded-4xl`)}>
    <div className="relative flex w-full overflow-hidden rounded-4xl h-full shadow-xl border-slate-700 border">
      <div className="absolute w-full h-3/4">
        <Image
          className="blur-sm"
          src={"/defaultBeatmapBanner.png"}
          alt="loadingImage"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" flex flex-col h-full w-full">
        <div className="flex w-full flex-col flex-wrap items-center justify-between bg-gradient-to-t from-slate-800 via-indigo-950 via-70%   to-osuhub-dark-ice-blue to-96% backdrop-blur-[15px]"></div>
        <div className="flex w-full flex-col flex-wrap items-center justify-between bg-gradient-to-t from-slate-800 via-indigo-950 via-70%   to-osuhub-dark-ice-blue to-96% backdrop-blur-[15px]"></div>
      </div>
      <div
        className={clsx("h-full w-full rounded-2xl  p-4 ", {
          "absolute overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent":
            isLoading,
        })}
      >
        <div className="relative space-y-3 z-10 opacity-80">
          <div className="h-14 rounded-lg bg-slate-700" />
          <div className="h-3 w-11/12 rounded-lg bg-slate-700" />
          <div className="h-3 w-8/12 rounded-lg bg-slate-700" />
        </div>
      </div>
      <div className="relative flex h-full w-20 flex-col items-end justify-center">

      </div>
    </div>
    {/* fake button media buttons */}
    <div className="w-[128px] h-full"></div>
  </div >
);
