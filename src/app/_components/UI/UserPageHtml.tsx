"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const UserPageHtml = ({ html }: { html: string }) => {
  const [isFolded, setIsFolded] = useState(true);
  // TODO: check for user 18983 and see if it works
  return (
    <motion.div className="flex flex-col  w-full overflow-hidden  rounded-2xl shadow-2xl mt-8 mb-8   border-2 border-slate-700 ">
      <motion.div
        className="p-4"
        initial={{ maxHeight: "auto" }}
        animate={{
          height: isFolded ? 240 : "100%"
        }}
        transition={{ duration: 0.5 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div
        className="flex flex-row h-6 p-4  items-center w-full  border-t-2  justify-center  backdrop-blur-2xl"
        onClick={() => setIsFolded(!isFolded)}
      >
        {isFolded ? "Show more" : "Show less"}
      </div>
    </motion.div>
  );
};

export default UserPageHtml;
