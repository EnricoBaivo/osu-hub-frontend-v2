
import { type beatmapMetaDataType } from "@/hooks/useAudio";
import { Suspense } from "react";
import AniListNote from "../../UI/AniList/AniListNote";
import PlayButton from "../../UI/PlayButton";

const ScoreBannerHeaderWithPlay = ({ beatmapMetaData }: { beatmapMetaData: beatmapMetaDataType }) => {
  return (
    <div className="flex w-[550px] justify-between gap-8 rounded-br-4xl rounded-tl-4xl bg-osuhub-dark-ice-blue bg-opacity-20 px-10 py-4 shadow backdrop-blur-md">
      <div className="flex flex-col gap-2.5">
        <div className="flex  items-center gap-2 font-exo text-xl font-black uppercase text-osuhub-yellow">
          {beatmapMetaData.author}
          <AniListNote hasAniList={beatmapMetaData.hasAniList} beatmapset_id={beatmapMetaData.beatmapset_id} />
        </div>

        <div className="font-exo text-xl font-semibold uppercase text-white">
          {beatmapMetaData.title}
        </div>
        <div className="flex items-center justify-start gap-2.5">
          <div className="font-exo tracking-wider text-center font-normal uppercase text-white hover:text-osuhub-gray">
            [{beatmapMetaData.version}]
          </div>
          <div className="font-exo tracking-wider text-center font-normal uppercase text-white hover:text-osuhub-gray">
            Created by
          </div>
          <div className="font-exo tracking-wider text-center font-normal uppercase text-white hover:text-osuhub-gray">
            {beatmapMetaData.creator}
          </div>

        </div>

      </div>
      <PlayButton beatmapMetaData={beatmapMetaData} />
    </div>
  );
};

export default ScoreBannerHeaderWithPlay;
