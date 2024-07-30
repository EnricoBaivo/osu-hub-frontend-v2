"use client"
import * as Slider from '@radix-ui/react-slider';
import Style from './index.module.css';
import clsx from 'clsx';
import React, { useMemo } from 'react';
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
type Range = [number, number];


interface Props {
  default: number[] | number;
  minStepsBetweenThumbs?: number;
  step: number;
  range: number[];
  className?: string;
  title?: string;
  anker?: string;
  disabled?: boolean;
  callback: (e: number[] ) => void;
  convertDisplayValue?: (e: number) => string;
}


const SliderThumb = (props: { convertDisplayValue?: (e: number) => string, anker?: string, value?: number }) => {
  return (
    <Slider.Thumb className={clsx(Style.SliderThumb, "border-slate-500 shadow-xl backdrop-blur-lg bg-osuhub-gray shadow-black hover:bg-indigo-500 focus:bg-indigo-600 hover:shadow-sm")}>
      <div className='pt-4 text-center'>
        <span className={"text-base"}>
          {props.convertDisplayValue !== undefined ? props.convertDisplayValue(props.value ?? 0) : props.value}
        </span>
        {props.anker && <span className={"font-mono text-sm "}>{props.anker}</span>}
      </div>
    </Slider.Thumb>
  );
}

const RangeSlider = (props: Props) => {
  const [value, setValue] = React.useState<number[] | number>(props.default);

  const MemorizedRangeSlider = useMemo(() => {
    if (typeof value === 'number') {
      return <SliderThumb convertDisplayValue={props.convertDisplayValue} anker={props.anker} value={value} />
    } else {
      return (
        <>
          <SliderThumb convertDisplayValue={props.convertDisplayValue} anker={props.anker} value={value[0]} />
          <SliderThumb convertDisplayValue={props.convertDisplayValue} anker={props.anker} value={value[1]} />
        </>
      );
    }
  }, [value, props]);

  const handleValueChange = (e: number[] | number) => {
    setValue(e);
    // Wrapping the callback argument to match the expected updater function signature
    if (Array.isArray(e)) {
      props.callback(e);
    } else {
      props.callback([e]);
    }
  };


  return (
    <div className={clsx(props.className, "flex min-w-44 font-exo items-center h-20 justify-center rounded-xl p-5 bg-osuhub-gray", props.disabled ? "opacity-50" : "opacity-100")}>
      <div className={"pr-4 flex-shrink pl-4 text-lg"}>{props.title}</div>
      <Slider.Root
        disabled={props.disabled ?? false}
        step={props.step}
        min={props.range[0]}
        max={props.range[1]}
        minStepsBetweenThumbs={props.minStepsBetweenThumbs}
        className={clsx("flex flex-grow z-20 h-14 relative items-center select-none touch-none backdrop-blur-lg")}
        orientation="horizontal"
        onValueChange={handleValueChange}
        defaultValue={typeof props.default === 'number' ? [props.default] : props.default}
      >
        <Slider.Track className={clsx(Style.SliderTrack, "bg-osuhub-dark-ice-grey")}>
          <Slider.Range className={clsx(Style.SliderRange, "bg-white")} />
        </Slider.Track>
        {MemorizedRangeSlider}
      </Slider.Root>
    </div>
  );
}

export default RangeSlider;
