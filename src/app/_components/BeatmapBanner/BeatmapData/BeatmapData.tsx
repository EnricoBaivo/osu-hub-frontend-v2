import SpotlightLightText from "../../UI/SpotlightText";

export interface BeatmapDataProps {

  max_combo: number;
}

const BeatmapData = ({

  max_combo,
}: BeatmapDataProps) => {
  return (
    <div className="flex flex-wrap items-start justify-start gap-8">

      <SpotlightLightText
        title={
          <>
            
            {max_combo.toFixed(0).toString()}
          </>
        }
        subtitle="MAX COMBO"
      />
    </div>
  );
};
export default BeatmapData;
