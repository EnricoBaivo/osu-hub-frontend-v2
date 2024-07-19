"use client";
import { motion } from "framer-motion";
import React from "react";
import { BsFillBalloonHeartFill } from "react-icons/bs";

const AnimatedHeart = () => {
  const heartRef = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div ref={heartRef}>
      <BsFillBalloonHeartFill className="absolute  fill-red-500" />
    </motion.div>
  );
};

export default AnimatedHeart;
