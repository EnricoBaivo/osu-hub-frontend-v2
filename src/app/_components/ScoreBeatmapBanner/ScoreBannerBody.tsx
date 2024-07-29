import InfoNodges, { InfoNodgesProps } from "../UI/InfoNodge/InfoNodges";
import type { DifficultyAttributesOverlayProps } from "./DifficultyAttributesOverlay/DifficultyAttributesOverlay";
import DifficultyAttributesOverlay from "./DifficultyAttributesOverlay/DifficultyAttributesOverlay";
import Image from "next/image";
import ScoreBannerHeaderWithPlay from "./ScoreBannerHeaderWithPlay/ScoreBannerHeaderWithPlay";
import React from "react";
import { beatmapMetaDataType } from "@/hooks/useAudio";
interface ScoreBannerBodyProps {
    DifficultyAttributesOverlay: DifficultyAttributesOverlayProps;
    infoNodges: InfoNodgesProps;
    beatmapMetaData: beatmapMetaDataType;
    score_id: number;
    reached_rank: string;
}
const ScoreBannerBody = (props: ScoreBannerBodyProps) => {

    return <div
        className="flex flex-row h-full w-full justify-between">
        <div className="flex flex-col ">
            <ScoreBannerHeaderWithPlay
                beatmapMetaData={props.beatmapMetaData}
            />

            <InfoNodges
                isInView={props.isOnScore}
                key={props.score_id + "infoNodge"}

            >
                {props.infoNodges.children}
            </InfoNodges>

        </div>
        <div className="flex flex-col justify-between items-end pt-2 pb-2 pr-2">
            {props.reached_rank !== "F" && <Image className="z-20 " src={"/grades/" + props.reached_rank.toLowerCase() + ".svg"} alt={"rank " + props.reached_rank} width={150} height={125} />
            }

            <DifficultyAttributesOverlay
                key={props.score_id + "DifficultyAttributesOverlay"}
                ar={props.DifficultyAttributesOverlay.ar}
                pr={props.DifficultyAttributesOverlay.pr}
                od={props.DifficultyAttributesOverlay.od}
                cs={props.DifficultyAttributesOverlay.cs}
                hp={props.DifficultyAttributesOverlay.hp}
                score={props.DifficultyAttributesOverlay.score}
                lengthSeconds={props.DifficultyAttributesOverlay.lengthSeconds}
                bpm={props.DifficultyAttributesOverlay.bpm}
                n_circles={props.DifficultyAttributesOverlay.n_circles}
                n_sliders={props.DifficultyAttributesOverlay.n_sliders}
                stars={props.DifficultyAttributesOverlay.stars}
            />
        </div>



    </div>
}
export default ScoreBannerBody;