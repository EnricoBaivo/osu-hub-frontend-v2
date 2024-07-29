import type { InfoNodgesProps } from "../UI/InfoNodge/InfoNodges";
import type { DifficultyAttributesOverlayProps } from "@/app/_components/ScoreBeatmapBanner/DifficultyAttributesOverlay/DifficultyAttributesOverlay";
import DifficultyAttributesOverlay from "@/app/_components/ScoreBeatmapBanner/DifficultyAttributesOverlay/DifficultyAttributesOverlay";
import ScoreBannerHeaderWithPlay from "../ScoreBeatmapBanner/ScoreBannerHeaderWithPlay/ScoreBannerHeaderWithPlay";
import InfoNodges from "../UI/InfoNodge/InfoNodges";
import { beatmapMetaDataType } from "@/hooks/useAudio";

interface BeatmapBannerBodyProps {
    beatmapMetaData: beatmapMetaDataType;
    DifficultyAttributesOverlay: DifficultyAttributesOverlayProps;
    infoNodges: InfoNodgesProps;

}
const BeatmapBannerBody = (props: BeatmapBannerBodyProps) => {

    return <div
        className="relative flex flex-row h-full w-full justify-between ">
        <div className="flex flex-col">
            <ScoreBannerHeaderWithPlay
                beatmapMetaData={props.beatmapMetaData}
            />
            <InfoNodges
                key={props.beatmapMetaData.title + props.beatmapMetaData.version + "infoNodge"}
            >
                {props.infoNodges.children}
            </InfoNodges>
        </div>
        <div className="flex flex-col items-end justify-center pr-2">
            <DifficultyAttributesOverlay
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
export default BeatmapBannerBody;