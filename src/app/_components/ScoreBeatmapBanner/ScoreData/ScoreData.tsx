import SpotlightLightText from "../../UI/SpotlightText";

export interface ScoreDataProps {
  reached_pp: number;
  accuracy: number;
  max_combo: number;
  reached_combo: number;
}

const ScoreData = ({
  reached_pp,
  accuracy,
  max_combo,
  reached_combo,
}: ScoreDataProps) => {
  return (
    <div className="flex flex-wrap items-start justify-start gap-8">
      <SpotlightLightText title={reached_pp.toString()} subtitle="REACHED PP" />
      <SpotlightLightText
        title={(accuracy * 100).toFixed(2).toString() + "%"}
        subtitle="WITH ACCURACY
        "
      />
      <SpotlightLightText
        title={
          <>
            <span className="text-2xl font-semibold"> {reached_combo}/</span>{" "}
            {max_combo.toFixed(0).toString()}
          </>
        }
        subtitle="MAX COMBO"
      />
    </div>
  );
};
export default ScoreData;
