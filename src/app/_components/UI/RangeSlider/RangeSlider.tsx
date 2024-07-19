"use client"
import * as Slider from '@radix-ui/react-slider';
import Style from './index.module.css';
import clsx from 'clsx';
import React, { useMemo } from 'react';

interface Props {
  default: [number, number];
  step: number;
  minStepsBetweenThumbs: number;
  range: [number, number];
  className?: string;
  title?: string;
  anker?: string;
  disabled?: boolean;
  callback: (e: number[]) => void;
  convertDisplayValue?: (e: number) => string;
}
type Range = [number, number];

function invertValue(value: number) {
  if (value <= 1) {
    return 25;
  } else if (value >= 25) {
    return 1;
  } else {
    const proportion = (value - 1) / (25 - 1);
    const invertedProportion = 1 - proportion;
    const invertedValue = Math.round(invertedProportion * 24) + 1;
    return invertedValue;
  }
}
function calculateMinRange(currValue: Range, rangeValue: Range): Range {
  const [min, max] = currValue;
  // Der maximale Wert beträgt 1000
  const maxLimit = rangeValue[1];
  // Der Abstand von 20% des höchsten Werts, jedoch begrenzt auf maxLimit
  const fifthteenOfMax = 0.15 * maxLimit
  let distance = Math.min(fifthteenOfMax, maxLimit - max);
  // Begrenze den Abstand auf das Limit des Skalierungsbereichs
  if (max + distance > maxLimit) {
    distance = maxLimit - max;
  }
  const distanceBetweenThumbs = max - min;

  //  Falls der Abstand zwischen den beiden Daumen kleiner als 10 ist,  erhöhe den Abstand um 10
  if (distanceBetweenThumbs < maxLimit * 0.001) {
    distance += invertValue(distanceBetweenThumbs);
  }
  // Berechne die neuen Werte
  const newMin = Math.max(rangeValue[0], min - distance);
  const newMax = Math.min(maxLimit, max + distance);

  return [Math.floor(newMin), Math.floor(newMax)];
}
const RangeSlider = (props: Props) => {
  const [value, setValue] = React.useState<[number, number]>(props.default);
  const memoizedMinRange = useMemo(() => calculateMinRange(value, props.range), [value, props.range]);

  return (
    <div className={clsx(props.className, "flex min-w-44 font-exo items-center h-20 justify-center rounded-xl p-5 bg-osuhub-gray",
      props.disabled ? "opacity-50 " : "opacity-100"

    )}>
      <div className={"pr-4 flex-shrink pl-4 text-lg"} >{props.title}</div>
      <Slider.Root
        disabled={props.disabled ?? false}
        step={props.step}
        min={props.range[0]}
        max={props.range[1]}
        minStepsBetweenThumbs={props.minStepsBetweenThumbs}
        onValueChange={(e: [number, number]) => {
          setValue([e[0], e[1]]);
          props.callback(e)
        }
        }
        className={clsx("flex flex-grow z-20 h-14 relative   items-center select-none touch-none backdrop-blur-lg ")}
        orientation="horizontal"
        defaultValue={props.disabled ? props.range : props.default}>
        <Slider.Track
          className={clsx(Style.SliderTrack, "bg-osuhub-dark-ice-grey")}>
          <Slider.Range className={clsx(Style.SliderRange, "bg-white")} />
        </Slider.Track>
        <Slider.Thumb className={clsx(Style.SliderThumb, " border-slate-500 shadow-xl backdrop-blur-lg bg-osuhub-gray shadow-black hover:bg-indigo-500 hover:shadow-sm")} >
          <div className='pt-4  text-center'>
            <span className={"text-base"}>
              {
                props.convertDisplayValue !== undefined ?
                  props.convertDisplayValue(value[0] ?? 0) : value[0]
              }
            </span>
            {props.anker && !props.disabled && <span className={"font-mono text-sm "}>{props.anker}</span>}
          </div>
        </Slider.Thumb>
        <Slider.Thumb className={clsx(Style.SliderThumb, "border-slate-500 shadow-xl backdrop-blur-lg bg-osuhub-gray shadow-black hover:bg-indigo-500 hover:shadow-sm focus:bg-indigo-600")} >
          <div className='pt-4  text-center'>

            <span className={"text-base"}>
              {
                props.convertDisplayValue !== undefined ?
                  props.convertDisplayValue(value[1] ?? 0) : value[1]
              }
            </span>
            {props.anker && <span className={"font-mono text-sm "}>{props.anker}</span>}
          </div>
        </Slider.Thumb>
      </Slider.Root>

    </div >
  );
};

export default RangeSlider;
