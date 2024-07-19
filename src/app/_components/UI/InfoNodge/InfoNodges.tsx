"use client"
import { AnimatePresence, motion } from "framer-motion";


export interface InfoNodgesProps {
  children: React.ReactNode
  isInView: boolean
}

const InfoNodges = ({ children, isInView }: InfoNodgesProps) => {
  return (<AnimatePresence  >
    {isInView &&
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
        className={"flex pl-8 flex-row flex-wrap gap-5 rounded-4xl py-5"} >
        {
          children
        }



      </motion.div >
    }
  </AnimatePresence>
  );
};

export default InfoNodges;
