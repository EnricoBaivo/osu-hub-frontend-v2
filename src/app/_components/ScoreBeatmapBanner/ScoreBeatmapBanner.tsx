"use client";
import { type InfoNodgesProps } from "../UI/InfoNodge/InfoNodges";
import ColoredSuccedStatus, {
  type ColoredSuccedStatusProps,
} from "./ColoredSuccedStatus/ColoredSuccedStatus";
import {
  type DifficultyAttributesOverlayProps,
} from "./DifficultyAttributesOverlay/DifficultyAttributesOverlay";

import { motion } from "framer-motion";
import { FallBackImage } from "../UI/OsuImage/FallbackImage";
import { memo, useState } from "react";
import { beatmapMetaDataType } from "@/hooks/useAudio";
import BeatmapBannerWrapper from "./BeatmapBannerWrapper";
import { ScoreBeatmapFooterProps } from "./ScoreBeatmapFooter";
import HoverContainerProvider from "@/hooks/useHoverContainer";


export interface ScoreBeatmapBannerProps {
  scoreBeatmapFooterData: ScoreBeatmapFooterProps;
  scoreBeatmapBannerSuccedStatusData: ColoredSuccedStatusProps;
  DifficultyAttributesOverlay: DifficultyAttributesOverlayProps;
  infoNodges: InfoNodgesProps;
  score_id: number;
  score_type: string;
  beatmapCoverCard: string;
  reached_rank: string;
  showDetails: boolean;
  beatmapset_video: boolean | null | undefined;
  preview_url: string | null | undefined;
  beatmapMetaData: beatmapMetaDataType
}

const ScoreBeatmapBanner = memo((props: ScoreBeatmapBannerProps) => {
  return (
    <HoverContainerProvider
      className="relative flex w-[900px] h-[700px] rounded-4xl shadow-xl border-slate-700 border ">
      <div className="relative flex w-full overflow-hidden  rounded-4xl h-full shadow-xl border-slate-700 border  ">
        <div className="absolute w-full h-4/6" >
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
        <BeatmapBannerWrapper
          DifficultyAttributesOverlay={props.DifficultyAttributesOverlay}
          infoNodges={props.infoNodges}
          reached_rank={props.reached_rank}
          beatmapMetaData={props.beatmapMetaData}
          scoreBeatmapFooterData={props.scoreBeatmapFooterData}
          score_id={props.score_id}
          score_type={props.score_type}
        />
        <ColoredSuccedStatus
          accuracy={props.scoreBeatmapBannerSuccedStatusData.accuracy}
          perfect={props.scoreBeatmapBannerSuccedStatusData.perfect}
          passed={props.scoreBeatmapBannerSuccedStatusData.passed}
        />
      </div>
    </HoverContainerProvider >
  );


});

export default ScoreBeatmapBanner;
