"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

const Progressbar = ({
  title,
  progress,
  className,
  text = true,
}: {
  title?: string;
  className?: string;
  progress: number;
  text?: boolean;
}) => {
  return (
    <div className="flex w-full gap-3 font-exo justify-between items-center  text-white">
      {title && <div className={clsx(className)}>{title}</div>}
      <div className="relative flex h-6 flex-grow overflow-hidden  rounded-lg border-slate-800 bg-slate-700  shadow-md">
        <motion.div
          className="h-full w-4/6  origin-left  bg-indigo-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 10 }}
          transition={{
            type: "spring",
            duration: 0.75,
            bounce: 0.5,
            delay: 1.2,
          }}
        />
        {text&& <div className="absolute pl-4">{progress.toFixed(1)}</div>}
      </div>
    </div>
  );
};

export default Progressbar;
