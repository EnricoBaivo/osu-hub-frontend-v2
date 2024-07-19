"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
export interface ScoreModsProps {
  mods: string[] | undefined[] | null[] | (string | null | undefined)[];
  setActive?: (value: string[]) => void;
}

const ScoreMods = ({ mods, setActive }: ScoreModsProps) => {
  const [activeMods, setActiveMods] = useState<string[]>(["NoMod"]);
  const handleSetActiveMod = (modId: string) => {
    setActiveMods((prevActiveMods) => {
      let newActiveMods;
      if (!prevActiveMods) {
        newActiveMods = [modId];
      } else if (prevActiveMods.includes(modId)) {
        newActiveMods = prevActiveMods.filter((mod) => mod !== modId);
      } else {
        newActiveMods = [...prevActiveMods, modId];
      }

      // If setActive is provided, update the parent state
      if (newActiveMods.length === 0 || modId === "NoMod") newActiveMods = ["NoMod"];
      if (newActiveMods.length > 1 && newActiveMods.includes("NoMod")) {
        console.log(newActiveMods);

        newActiveMods = newActiveMods.filter((mod) => mod !== "NoMod");
      }
      if (setActive) setActive(newActiveMods);

      return newActiveMods;
    });
  };
  return (
    <div className="flex w-full flex-row items-center justify-center gap-2.5 ">
      {mods?.map((mod) => {
        if (mod === null || mod === undefined) return null;
        return <motion.div key={mod}
          initial={{
            opacity: 0,
            y: -100
          }} animate={
            !setActive ? { opacity: 1, y: - 16 } :
              { opacity: activeMods.includes(mod) ? 1 : 0.5, y: 0 }
          } exit={{
            opacity: 0,
            y: -100
          }}
          onClick={() => handleSetActiveMod(mod)}
          whileHover={{ scale: 1.2, opacity: 1 }}
          className="relative w-14  ">
          {mod && <Image
            alt={mod}
            src={"/mods/" + mod.toLowerCase() + "@2x.png"}
            width={48}
            height={22}
          />}
        </motion.div>
      }
      )}
    </div >
  );
};

export default ScoreMods;
