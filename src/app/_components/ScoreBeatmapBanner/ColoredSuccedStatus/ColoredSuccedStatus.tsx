"use client"
import clsx from "clsx";
import { motion } from "framer-motion";
export interface ColoredSuccedStatusProps {
  accuracy?: number;
  perfect?: boolean;
  passed?: boolean;
}

const ColoredSuccedStatus = ({
  accuracy,
  perfect,
  passed,
}: ColoredSuccedStatusProps) => {
  if (accuracy === undefined || perfect === undefined || passed === undefined)
    return null;

  let colorIndicator = "hsl(0, 100%, 50%)";
  let text = "FAILED";
  if (perfect && passed) {
    colorIndicator = "hsl(60, 100%, 37%)";
    text = "PERFECT";
  }
  if (!perfect && passed) {
    // Ensure the percentage is within the range [60, 100]
    accuracy = Math.min(100, Math.max(60, accuracy * 100));
    const red = Math.round(((90 - accuracy) * 255) / 40);
    const green = Math.round(((accuracy - 70) * 255) / 40);

    colorIndicator = `rgb(${red}, ${green}, 0)`;
    text = "PASSED";
  }

  return (
    <motion.div
      animate={{ backgroundColor: ["rgb(2, 6, 23)", colorIndicator] }}
      style={{
        background: `url(/osu_repeatable_pattern.png), ${colorIndicator}`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto 80%",
      }}
      className={clsx(
        "relative flex h-full w-20 flex-col items-end justify-center",
      )}
    >
      <div className={clsx(
        "flex absolute top-0 left-0 flex-col h-full w-full items-center justify-center px-6 py-8",
        {
          "overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-green-100 before:to-transparent":
            perfect,
        })}>
        <div className="font-exo break-all text-center text-5xl font-black uppercase text-white">
          {text}
        </div>
      </div>
    </motion.div>
  );
};

export default ColoredSuccedStatus;
