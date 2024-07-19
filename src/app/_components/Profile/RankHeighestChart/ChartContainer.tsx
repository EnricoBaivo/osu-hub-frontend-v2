"use client";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import RankHeighestChart from "./RankHeighestChart";

const defaultDataArray = [
  { x: 1, y: 447981 },
  { x: 2, y: 447979 },
  { x: 3, y: 449110 },
  { x: 4, y: 448946 },
  { x: 5, y: 448988 },
  { x: 6, y: 449047 },
  { x: 7, y: 448901 },
  { x: 8, y: 448757 },
  { x: 9, y: 448601 },
  { x: 10, y: 448425 },
  { x: 11, y: 448235 },
  { x: 12, y: 448124 },
  { x: 13, y: 451509 },
  { x: 14, y: 451345 },
  { x: 15, y: 451183 },
  { x: 16, y: 451071 },
  { x: 17, y: 450888 },
  { x: 18, y: 450697 },
  { x: 19, y: 450658 },
  { x: 20, y: 450543 },
  { x: 21, y: 450395 },
  { x: 22, y: 450236 },
  { x: 23, y: 450250 },
  { x: 24, y: 450057 },
  { x: 25, y: 449853 },
  { x: 26, y: 449740 },
  { x: 27, y: 449604 },
  { x: 28, y: 449457 },
  { x: 29, y: 449289 },
  { x: 30, y: 449123 },
  { x: 31, y: 448967 },
  { x: 32, y: 449014 },
  { x: 33, y: 448847 },
  { x: 34, y: 449979 },
  { x: 35, y: 450113 },
  { x: 36, y: 449963 },
  { x: 37, y: 449922 },
  { x: 38, y: 462743 },
  { x: 39, y: 470331 },
  { x: 40, y: 479220 },
  { x: 41, y: 480964 },
  { x: 42, y: 480806 },
  { x: 43, y: 511916 },
  { x: 44, y: 524557 },
  { x: 45, y: 532649 },
  { x: 46, y: 532491 },
  { x: 47, y: 532295 },
  { x: 48, y: 532281 },
  { x: 49, y: 571867 },
  { x: 50, y: 601905 },
  { x: 51, y: 631804 },
  { x: 52, y: 643170 },
  { x: 53, y: 642899 },
  { x: 54, y: 642661 },
  { x: 55, y: 660997 },
  { x: 56, y: 673752 },
  { x: 57, y: 673567 },
  { x: 58, y: 704683 },
  { x: 59, y: 705355 },
  { x: 60, y: 706192 },
  { x: 61, y: 801065 },
  { x: 62, y: 806132 },
  { x: 63, y: 806099 },
  { x: 64, y: 809885 },
  { x: 65, y: 825483 },
  { x: 66, y: 827384 },
  { x: 67, y: 827004 },
  { x: 68, y: 826964 },
  { x: 69, y: 833388 },
  { x: 70, y: 836165 },
  { x: 71, y: 835784 },
  { x: 72, y: 857027 },
  { x: 73, y: 856620 },
  { x: 74, y: 856192 },
  { x: 75, y: 861492 },
  { x: 76, y: 864732 },
  { x: 77, y: 899317 },
  { x: 78, y: 906343 },
  { x: 79, y: 911632 },
  { x: 80, y: 944256 },
  { x: 81, y: 949183 },
  { x: 82, y: 952289 },
  { x: 83, y: 954040 },
  { x: 84, y: 987028 },
  { x: 85, y: 998192 },
  { x: 86, y: 997672 },
  { x: 87, y: 1015577 },
  { x: 88, y: 1015078 },
  { x: 89, y: 1019354 },
  { x: 90, y: 1024957 },
];
const transformToDataArray = (rawData: number[]) => {
  if (!rawData) return { data: defaultDataArray, isDefault: true };

  // https://airbnb.io/visx/xychart
  // Transform data from prisma to visx format
  // Dataformat day as x and rank as y where day is the index of raw data and rawData[] is rankz rawData = JSON.parse(data?.rank_history);
  return {
    data: rawData.map((d: number, index: number) => {
      return {
        x: 90 - index,
        y: d,
      };
    }), isDefault: false
  }
};

const ChartContainer = ({ rawData }: { rawData: number[] }) => {
  const { data: dataArray, isDefault } = transformToDataArray(rawData);
  return (
    dataArray && (
      <ParentSize>
        {({ width, height }) => (
          <RankHeighestChart
            width={width}
            height={height}
            data={dataArray}
            isDefault={isDefault}
          />
        )}
      </ParentSize>
    )
  );
};

export default ChartContainer;
