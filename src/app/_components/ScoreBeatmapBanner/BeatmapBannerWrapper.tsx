import { beatmapMetaDataType } from "@/hooks/useAudio";
import { InfoNodgesProps } from "../UI/InfoNodge/InfoNodges";
import { DifficultyAttributesOverlayProps } from "./DifficultyAttributesOverlay/DifficultyAttributesOverlay";
import ScoreBeatmapFooter, { ScoreBeatmapFooterProps } from "./ScoreBeatmapFooter";
import { useState } from "react";
import BeatmapBannerBody from "./ScoreBannerBody";

const BeatmapBannerWrapper = (props: {
    DifficultyAttributesOverlay: DifficultyAttributesOverlayProps,
    infoNodges: InfoNodgesProps, score_id: number, reached_rank: string,
    score_type: string,
    scoreBeatmapFooterData: ScoreBeatmapFooterProps,
    beatmapMetaData: beatmapMetaDataType,
    isOnScore: boolean

}) => {

    return <div

        className="flex w-full h-full flex-col"
    >
        <BeatmapBannerBody

            beatmapMetaData={props.beatmapMetaData}
            isOnScore={props.isOnScore}
            DifficultyAttributesOverlay={props.DifficultyAttributesOverlay}
            infoNodges={props.infoNodges}
            score_id={props.score_id}
            reached_rank={props.reached_rank}
        />
        <ScoreBeatmapFooter
            score_type={props.score_type}
            score_id={props.score_id}
            scoreHitData={props.scoreBeatmapFooterData.scoreHitData}
            scoreData={props.scoreBeatmapFooterData.scoreData}
            scorePredictionData={props.scoreBeatmapFooterData.scorePredictionData}
            scoreModsData={props.scoreBeatmapFooterData.scoreModsData}
            date={props.scoreBeatmapFooterData.date}
        />
    </div >
}

export default BeatmapBannerWrapper;