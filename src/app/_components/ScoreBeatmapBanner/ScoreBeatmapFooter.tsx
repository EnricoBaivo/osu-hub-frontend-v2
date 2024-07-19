"use client"

import Link from "next/link";
import VerticalTable from "../UI/Table/Table";
import ScoreData, { type ScoreDataProps } from "./ScoreData/ScoreData";
import ScoreHitCounts, { type ScoreHitCountsProps } from "./ScoreHitCounts/ScoreHitCounts";
import ScoreMods, { type ScoreModsProps } from "./ScoreMods/ScoreMods";
export interface ScorePredictionDataProps {
  accuracy: string[];
  pp: string[];
}
export interface ScoreBeatmapFooterProps {
  scoreModsData: ScoreModsProps;
  scoreData: ScoreDataProps;
  scoreHitData: ScoreHitCountsProps;
  scorePredictionData: ScorePredictionDataProps;
  score_id: number;
  score_type: string;
  date: Date | null;
}
const ScoreBeatmapFooter = (props: ScoreBeatmapFooterProps) => {

  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-between bg-gradient-to-t from-slate-800 via-indigo-950 via-70%   to-osuhub-dark-ice-blue to-96% backdrop-blur-[15px]">
      <ScoreMods mods={props.scoreModsData.mods} />

      <div className="flex flex-wrap justify-between items-center w-full py-2 px-6">
        <div className="flex flex-col gap-2">
          <ScoreData
            reached_pp={props.scoreData.reached_pp}
            accuracy={props.scoreData.accuracy}
            max_combo={props.scoreData.max_combo}
            reached_combo={props.scoreData.reached_combo}
          />
          <VerticalTable
            unique_id={props.score_id}
            dataset={[
              {
                header: "Accurracy",
                data: props.scorePredictionData.accuracy,
              },
              {
                header: "PP",
                data: props.scorePredictionData.pp,
              },
            ]}

          /></div>
        <ScoreHitCounts
          count_miss={props.scoreHitData.count_miss}
          count_geki={props.scoreHitData.count_geki}
          count_katu={props.scoreHitData.count_katu}


          n_300={props.scoreHitData.n_300}
          n_100={props.scoreHitData.n_100}
          n_50={props.scoreHitData.n_50}
        />
      </div>
      <div className="bottom-2 w-full pl-4 pb-3 font-bold left-2 uppercase text-slate-700/95">
        {props.score_type == "score_best_osu" && <Link target="_blank" about="OSU! score" href={"https://osu.ppy.sh/scores/osu/" + props.score_id} >
          <code >secret_no. {props.score_id} </code>
        </Link>}
        <code >Date {props.date?.toUTCString() ?? "missing"} </code>
      </div>
    </div >
  );
};

export default ScoreBeatmapFooter;