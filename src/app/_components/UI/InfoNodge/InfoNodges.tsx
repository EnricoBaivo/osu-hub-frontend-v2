"use client"
import { useContainerIsHovered } from "@/hooks/useHoverContainer";
import { AnimatePresence, motion } from "framer-motion";


export interface InfoNodgesProps {
  children: React.ReactNode
}

const InfoNodges = ({ children }: InfoNodgesProps) => {

  const isHovered = useContainerIsHovered()
  return (<AnimatePresence  >
    {isHovered &&
      <motion.div initial={{
        opacity: 0,
        y: -100
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -100
      }}
        className={"flex pl-6 flex-row flex-wrap gap-4 rounded-4xl py-4"} >
        {
          children
        }



      </motion.div >
    }
  </AnimatePresence>
  );
};

export default InfoNodges;
