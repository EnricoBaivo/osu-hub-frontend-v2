
import { type InfoNodgesProps } from "../UI/InfoNodge/InfoNodges";

import {
  type DifficultyAttributesOverlayProps,
} from "@/app/_components/ScoreBeatmapBanner/DifficultyAttributesOverlay/DifficultyAttributesOverlay";

import { motion } from "framer-motion";
import BeatmapFooter, { type BeatmapFooterProps } from "./BeatmapFooter";
import { FallBackImage } from "../UI/OsuImage/FallbackImage";
import ScoreBannerBody from "./BeatmapBannerBody";
import { beatmapMetaDataType } from "@/hooks/useAudio";


export interface beatmapBannerProps {

  beatmapFooterData: BeatmapFooterProps;
  DifficultyAttributesOverlay: DifficultyAttributesOverlayProps;
  infoNodges: InfoNodgesProps;
  beatmapCoverCard: string;
  showDetails: boolean;
  beatmapset_video: boolean | null | undefined;
  preview_url: string | null | undefined;
  beatmapMetaData: beatmapMetaDataType

}
const BeatmapBanner = (props: beatmapBannerProps) => {
  return (
    <div
      className="flex w-[48%] min-w-[980px] justify-center items-center ">
      <motion.div
        className="relative flex w-full rounded-4xl h-[550px] shadow-xl border-slate-700 border  ">
        <div className="relative flex w-full overflow-hidden  rounded-4xl h-full shadow-xl border-slate-700 border  ">
          <div className="absolute w-full h-3/5" >
            <FallBackImage
              quality={100}
              background={true}
              objectFit="cover"
              objectPosition="top"
              src={props.beatmapCoverCard}
              alt={
                "backgroundcover for " +
                props.beatmapMetaData.author +
                " " +
                props.beatmapMetaData.creator +
                " " +
                props.beatmapMetaData.title +
                " " +
                props.beatmapMetaData.version
              }
            />
          </div>
          <div className="flex w-full h-full flex-col">
            <ScoreBannerBody
              beatmapMetaData={props.beatmapMetaData}
              DifficultyAttributesOverlay={props.DifficultyAttributesOverlay}
              infoNodges={props.infoNodges}
            />
            <BeatmapFooter
              addedDate={props.beatmapFooterData.addedDate}
              beatmapFailtimes={props.beatmapFooterData.beatmapFailtimes}
              predictionData={props.beatmapFooterData.predictionData}
              modsData={props.beatmapFooterData.modsData}
              max_combo={props.beatmapFooterData.max_combo}
            />
          </div>
        </div>
      </motion.div >
    </div >

  );
};

export default BeatmapBanner;
