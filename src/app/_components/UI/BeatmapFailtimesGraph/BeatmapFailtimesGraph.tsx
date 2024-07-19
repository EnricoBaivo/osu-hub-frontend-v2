
import React, { useMemo, useState } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";

import { localPoint } from "@visx/event";
import { scaleBand, scaleLinear } from "@visx/scale";
import { ParentSize } from "@visx/responsive";

import { AxisBottom } from '@visx/axis';
import type { Fails } from "osu-web.js";

export type BarsProps = {
    width: number;
    height: number;
    events?: boolean;
    margin?: { top: number, right: number, bottom: number, left: number }
    color?: { axisStrokeColor: string, axisTickColor: string }
    data: Fails

};

const BeatmapFailtimesGraphBars = ({ data, width, height, color = { axisStrokeColor: "#2E2F71", axisTickColor: "#2E2F71" }, margin = { top: 20, right: 0, bottom: 0, left: 0 }, events = false }: BarsProps) => {

    // accessors
    const getIndex = (data: number, i: number) => i.toString();
    const getDataValue = (data: number, i: number) => data;
    // bounds
    const xMax = width;
    const yMax = height - margin.top - 50;


    // scales, memoize for performance
    const xScale = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: data?.fail?.map(getIndex),
                padding: 0.4,
            }),
        [xMax, data.fail]
    );
    const yScale = useMemo(
        () => {
            if (data.exit && data.fail)
                return scaleLinear<number>({
                    range: [yMax, 0],
                    round: true,
                    domain: [0, Math.max(...[Math.max(...data.exit?.map(getDataValue)), Math.max(...data.fail?.map(getDataValue))])],
                })
        },
        [yMax, data.fail, data.exit]
    );
    const [selectedBar, setSelectedBar] = useState<string | null>(null);
    const handleMouseOver = (event: React.MouseEvent<SVGRectElement, MouseEvent>, d: number, i: string) => {
        setSelectedBar(i);
        const eventTarget = event.target as SVGRectElement;
        if (!eventTarget.ownerSVGElement) return;
        const coords = localPoint(eventTarget.ownerSVGElement, event);
        if (!coords) return;

    };

    const handleMouseOut = () => {
        setSelectedBar(null);
    };
    const purple3 = '#a44afe';
    if (!data.exit || !data.fail) return null;
    if (width < 10) return null;
    if (height < 10) return null;
    if (!yScale ) return null;

    return <div style={{ position: "relative" }}>
        <svg width={width} height={height}>
            <rect width={width} height={height} fill="url(#teal)" rx={14} />
            <Group top={(margin.top + margin.bottom) / 2}>
                {data.exit.map((d, i) => {
                    const letter = getIndex(d, i);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - (yScale(getDataValue(d, i)) ?? 0);
                    const barX = xScale(letter);
                    const barY = yMax - barHeight;

                    return (
                        <Bar
                            key={`bar-${letter}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={
                                selectedBar === "exit" + i ? "red" : "rgba(23, 233, 217, .5)"
                            } // Change color for selected bar
                            onMouseOver={(event) => handleMouseOver(event, d, "exit" + i)}
                            onMouseOut={handleMouseOut}
                            onClick={() => {
                                if (events) {
                                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                                }
                            }}
                        />
                    );
                })}
            </Group>
            <Group top={(margin.top + margin.bottom) / 2}>
                {data.fail.map((d, i) => {
                    const letter = getIndex(d, i);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - (yScale(getDataValue(d, i)) ?? 0);
                    const barX = xScale(letter);
                    const barY = yMax - barHeight;
                    return (
                        <Bar
                            key={`bar-${letter}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill={
                                selectedBar === "fail" + i
                                    ? "red"
                                    : "rgba(343, 233, 217, .5)"
                            } // Change color for selected bar
                            onMouseOver={(event) => handleMouseOver(event, d, "fail" + i)}
                            onMouseOut={handleMouseOut}
                            onClick={() => {
                                if (events) {
                                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                                }
                            }}
                        />
                    );
                })}
            </Group>
            <AxisBottom
                top={yMax + margin.top}
                scale={xScale}
                numTicks={4}
                label="Players exited"
                labelProps={{
                    fill: purple3,
                    fontSize: 11,
                    textAnchor: 'middle',
                }}
                tickFormat={(d) => d}
                stroke={color.axisStrokeColor}
                tickStroke={color.axisTickColor}
                tickLabelProps={{
                    fill: purple3,
                    fontSize: 11,
                    textAnchor: 'middle',
                }}
                tickLength={3}
                strokeDasharray="."
            />
        </svg>
    </div>

}

const BeatmapFailtimesGraph = ({ data }: {
    data: Fails
}) => {
    if (!data.exit || !data.fail)
        return null
    return <ParentSize>
        {({ width, height }) => (
            data.exit && data.fail && <BeatmapFailtimesGraphBars data={data} width={width} height={height} />
        )}
    </ParentSize>;
}
export default BeatmapFailtimesGraph;