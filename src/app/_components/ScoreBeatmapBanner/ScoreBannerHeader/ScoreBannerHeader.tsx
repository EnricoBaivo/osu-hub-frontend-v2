import { beatmapMetaDataType } from "@/hooks/useAudio";

const ScoreBannerHeader = (props: beatmapMetaDataType) => {
  return (
    <div className="flex flex-col max-w-2xl items-start justify-start gap-2.5 rounded-br-4xl rounded-tl-4xl bg-osuhub-dark-ice-blue bg-opacity-20 px-8 py-5 shadow backdrop-blur-md">
      <div className=" flex flex-wrap items-center justify-start sm:gap-5 ">
        <div className="flex flex-wrap items-center justify-start gap-2 leading-3 ">
          <div className="font-exo text-2xl font-black uppercase text-white">
            {props.author}
          </div>
          <div className="font-exo text-2xl font-black uppercase text-white">
            -
          </div>
          <div className="font-exo text-2xl font-black uppercase text-white">
            {props.title}
          </div>
        </div>
        <div className="font-exo flex text-center  text-xl text-white">
          [ {props.version} ]
        </div>
      </div>
      <div className="flex items-start justify-start gap-2.5">
        <div className="font-exo tracking-xwidest text-center font-normal uppercase text-white">
          Created by{" "}
        </div>
        <div className="font-exo tracking-xwidest text-center font-normal uppercase text-white">
          {props.creator}
        </div>
      </div>
    </div>
  );
};

export default ScoreBannerHeader;
