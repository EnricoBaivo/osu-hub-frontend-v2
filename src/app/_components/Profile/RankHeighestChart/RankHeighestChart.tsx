"use client";
import React from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";

// you'll often use just a few of them.
type Data = {
  x: number;
  y: number;
};
const RankHeighestChart = ({
  width,
  height,
  data,
  isDefault,
}: {
  width: number;
  height: number;
  isDefault: boolean;
  data: Data[];
}) => {
  const [isHovering, setIsHovering] = React.useState(false);
  // reverse data to get the latest data first
  if (!data) return null;
  // Define accessors to access data in visx
  // Date as Day and Rank as Y

 
  const accessors = {
    xAccessor: (d: Data) => d.x,
    yAccessor: (d: Data) => d.y,
  };
  //  motion value
  const margin = 20;
  const innerWidth = width - margin;
  const innerHeight = height - margin;

  const marginA = {
    left: 50,
    top: 25,
    right: 50,
    bottom: 50,
  };
  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <XYChart
        xScale={{
          type: "band",
          Range: [margin, innerHeight],
          padding: 0.2,
        }}
        yScale={{
          type: "linear",
          Range: [margin, innerHeight],
          zero: false,
          padding: 0.2, reverse: true,
        }}
        margin={marginA}
        height={Math.min(400, height)}
        width={Math.min(1200, width)}

      >
        {/* <CustomChartBackground /> */}
        <AnimatedLineSeries
          dataKey="Rank"
          data={data}
          {...accessors}

          stroke="#6366f1"
        />
        {isHovering && (
          <>
            <AnimatedAxis
              // animationTrajectory="min"
              label="DAY"
              labelOffset={20}
              orientation="bottom"
              hideAxisLine={true}
              numTicks={(data.length / width) * 100}
            />
            <AnimatedAxis
              // animationTrajectory="max"
              label="Ranks"
              orientation="left"
              labelOffset={50}
              hideAxisLine={true}
              hideTicks={true}

            />
            <AnimatedGrid columns={false} numTicks={5} />
            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              renderTooltip={({ tooltipData, colorScale }) => {
                if (!colorScale || !tooltipData) return null;
                return tooltipData.nearestDatum && (
                  <div>
                    <div
                      style={{
                        color: colorScale(tooltipData?.nearestDatum.key),
                      }}
                    >
                      {tooltipData.nearestDatum.key}
                      {accessors.yAccessor(tooltipData.nearestDatum.datum as Data)}
                    </div>
                    {accessors.xAccessor(tooltipData.nearestDatum.datum as Data)} days
                    ago
                    <br />
                  </div>
                );
              }
              }
            />
          </>
        )}
      </XYChart>
    </div>
  );
};
export default RankHeighestChart;
