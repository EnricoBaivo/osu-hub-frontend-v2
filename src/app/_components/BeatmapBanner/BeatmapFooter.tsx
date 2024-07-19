
import VerticalTable from "../UI/Table/Table";
import ScoreMods, { type ScoreModsProps } from "@/app/_components/ScoreBeatmapBanner/ScoreMods/ScoreMods";
import BeatmapFailtimesGraph from "../UI/BeatmapFailtimesGraph/BeatmapFailtimesGraph";
import type { Fails } from "osu-web.js";
export interface ScorePredictionDataProps {
  accuracy: string[];
  pp: string[];
}
export interface BeatmapFooterProps {
  modsData: ScoreModsProps;
  predictionData: ScorePredictionDataProps;
  addedDate: Date;
  beatmapFailtimes: Fails
  max_combo: number
}
const BeatmapFooter = (props: BeatmapFooterProps) => {
  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-between bg-gradient-to-t from-slate-800 via-indigo-950 via-70%   to-osuhub-dark-ice-blue to-96% backdrop-blur-[15px]">
      <ScoreMods mods={props.modsData.mods} />

      <div className="flex flex-wrap justify-around items-center w-full py-2 px-6">
        <VerticalTable
          dataset={[
            {
              header: "Accurracy",
              data: props.predictionData.accuracy,
            },
            {
              header: "PP",
              data: props.predictionData.pp,
            },
          ]}

        />
        <div className="flex h-44 w-80 flex-col justify-center items-center">
          <BeatmapFailtimesGraph data={props.beatmapFailtimes} />
        </div>
      </div>
      <code> {`${props.addedDate.toISOString()}`}</code>
    </div >
  );
};

export default BeatmapFooter;