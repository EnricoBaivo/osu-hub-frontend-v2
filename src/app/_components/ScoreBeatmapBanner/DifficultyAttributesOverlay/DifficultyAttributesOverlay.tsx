"use client"

import { AnimatePresence, motion } from "framer-motion";
import Progressbar from "../../UI/Progressbar/Progressbar";
import Image from "next/image";
import { secondsToMinutesAndSecondsString } from "@/utils/time";
export interface DifficultyAttributesOverlayProps {
  stars: number;
  ar: number;
  pr: number;
  od: number;
  cs: number;
  hp: number;
  score: number;
  lengthSeconds: number;
  bpm: number;
  n_circles: number;
  n_sliders: number;
  isInView?: boolean;

}

const DifficultyAttributesOverlay = (
  { stars,
    ar,
    pr,
    cs,
    hp,
    lengthSeconds,
    bpm,
    n_circles,
    n_sliders,
    isInView = true }: DifficultyAttributesOverlayProps

) => {
  const clsName = "w-2/6 "
  return (
    <AnimatePresence> {isInView &&
      <motion.div initial={{
        opacity: 0,
        x: 100
      }}
        animate={{
          opacity: 1,
          x: 0
        }}
        exit={{
          opacity: 0,
          x: 100
        }}
        className="text-bold font-exo absolute right-4 top-[150px] z-50 flex w-[300px] flex-col justify-center self-center	justify-self-center gap-[9px] rounded-3xl bg-osuhub-dark-ice-grey px-6 py-2 text-white shadow-lg backdrop-blur-md ">
        <div className="flex w-full items-center justify-between">
          <Image
            alt={"total_length_icon"}
            width={25}
            height={25}
            src={"/beatmapset-icons/total_length.svg"}
          />
          <div className="text-center  text-base font-normal text-white">{secondsToMinutesAndSecondsString(lengthSeconds, true)}</div>
          <Image
            alt="bpm_icon"
            width={25}
            height={25}
            src={"/beatmapset-icons/bpm.svg"}
          />
          <div className="text-center  text-base font-normal text-white">
            {bpm.toFixed(0)}
          </div>
          <Image
            alt="count_circles_icon"
            width={25}
            height={25}
            src={"/beatmapset-icons/count_circles.svg"}
          />
          <div className="text-center  text-base font-normal text-white">
            {n_circles}
          </div>
          <Image
            alt="count_sliders_icon"
            width={25}
            height={25}
            src={"/beatmapset-icons/count_sliders.svg"}
          />
          <div className="text-center  text-base font-normal text-white">
            {n_sliders}
          </div>
        </div>
        <Progressbar className={clsName} progress={cs} title="Circle-Size" />
        <Progressbar className={clsName} progress={hp} title="HP-Drain" />
        <Progressbar className={clsName} progress={ar} title="Apro-rate" />
        <Progressbar className={clsName} progress={pr} title="Presicion" />
        <Progressbar
          progress={stars}
          title="Stars"
          className={clsName + "text-osuhub-yellow"}
        />
      </motion.div>
    }</AnimatePresence>
  );
};

export default DifficultyAttributesOverlay;
