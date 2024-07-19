"use client";
import { useEffect, useState } from "react";
import InputField from "./InputField";

interface DurationFilter extends React.InputHTMLAttributes<HTMLInputElement> {
    defaultV: number[];
    updateDurationFilter: (e: number[]) => void;
}
//  Borders: 35min - 10min - 7min - 5 min - 3min-2min -1min - 0min
const durationBorders = [2100, 600, 420, 300, 180, 120, 60, 0];

function getDurationBorder(e: number) {
    // e 5min 5*60 = 200
    durationBorders.reverse()
    const border = durationBorders.findIndex((border) => border > e);
    if (border) return [border - 1, border];
    return [0, 1];
}
const DurationFilter = ({ defaultV, updateDurationFilter }: DurationFilter) => {
    const [currentDuration, setDuration] = useState<number[]>(defaultV); // [min, max ]


    return currentDuration ? <>
        < InputField
            onChange={(e) => updateDurationFilter(currentDuration)}
            updatedValue={currentDuration[0] ? currentDuration[0] : currentDuration[0]}
            callback={(e) => {
                setDuration((prev) => [e, prev[1] ?? 120])
                updateDurationFilter(currentDuration)
            }}
            default={defaultV[0]} className={"w-1/4"} />
        <InputField

            updatedValue={currentDuration[1] ? currentDuration[1] : currentDuration[0]}

            callback={(e) => {
                setDuration((prev) => [prev[0] ?? 0, e])
                updateDurationFilter(currentDuration)
            }}
            default={defaultV[1]} className={"w-1/4"} />
    </>
        : null


}
export default DurationFilter;