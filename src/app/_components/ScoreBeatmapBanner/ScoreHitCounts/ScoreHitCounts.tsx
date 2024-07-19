import clsx from "clsx";

export interface ScoreHitCountsProps {
  count_miss: string;
  count_geki: string;
  count_katu: string;
  n_300: string;
  n_100: string;
  n_50: string;
}
enum hitType {
  "n300" = "300",
  "n100" = "100",
  "n50" = "50",
  "miss" = "MISS",
  "geki" = "GEKI",
  "katu" = "KATU",

}
const HitText = ({ type }: { type: hitType }) => {
  return (
    <div
      className={clsx("font-exo text-2xl font-bold drop-shadow-2xl ", {
        "text-violet-900": type == hitType.geki,
        "text-osuhub-blue": type == hitType.katu,
        "text-osuhub-yellow": type == hitType.n300,
        "text-osuhub-green": type == hitType.n100,
        "text-stone-300": type == hitType.n50,
        "text-osuhub-red": type == hitType.miss,
      })}
    >
      {type}
    </div>
  );
};
const HitNumber = ({ number = "x" }: { number?: string }) => {
  return (
    <div className={"font-exo text-2xl font-normal text-white"}>{number}</div>
  );
};
const ScoreHitCounts = ({ n_300, n_100, n_50, count_miss,
  count_geki,
  count_katu }: ScoreHitCountsProps) => {
  return (
    <div className="flex  items-start justify-start gap-2">
      <div className="flex  items-start justify-start gap-2">
        <div className="flex flex-col items-start justify-center gap-2.5">

          <HitText type={hitType.n300} />
          <HitText type={hitType.n100} />
          <HitText type={hitType.n50} />


        </div>
        <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
          <HitNumber />
          <HitNumber />
          <HitNumber />
        </div>
        <div className="flex flex-col items-start justify-center gap-2.5">

          <HitNumber number={n_300} />
          <HitNumber number={n_100} />
          <HitNumber number={n_50} />

        </div>
      </div>
      <div className="flex  items-start justify-start gap-2.5">
        <div className="flex flex-col items-start justify-center gap-2.5">
          <HitText type={hitType.geki} />
          <HitText type={hitType.katu} />
          <HitText type={hitType.miss} />



        </div>
        <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
          <HitNumber />
          <HitNumber />
          <HitNumber />

        </div>
        <div className="flex flex-col items-start justify-center gap-2.5">
          <HitNumber number={count_geki} />
          <HitNumber number={count_katu} />
          <HitNumber number={count_miss} />


        </div>
      </div>
    </div>
  );
};

export default ScoreHitCounts;
