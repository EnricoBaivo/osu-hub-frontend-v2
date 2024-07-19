"use client";

import useQueryParams from "@/hooks/useQueryParams";
import { AnimatePresence, motion } from "framer-motion";

import React from "react";
const rangeBetweenFirstAndLast = (
  rangeInt: number,
  current: number,
  last: number,
) => {
  const pageNumbers = [];
  for (
    let i = Math.max(1, current - rangeInt);
    i <= Math.min(current + rangeInt, last);
    i++
  ) {
    if (i !== 0 && i !== last) pageNumbers.push(i);
  }
  return [0, ...pageNumbers, last];
};
export function PaginationLink({
  total,
  cursor,
}: {
  total: number;
  cursor: number;
}) {
  const range = rangeBetweenFirstAndLast(2, cursor, total);
  const {  setQueryParam } = useQueryParams();

  return (
    <motion.div className="flex justify-between gap-4 md:max-w-[400px] xl:max-w-[550px]">
      <AnimatePresence>
        {range.map((page) => {
          return (
            <button
              key={page}
              onClick={() => {
                setQueryParam("page", page.toString());
              }}
            >
              <motion.div
                layout
                className={
                  "-z-10 rounded-lg border-2 border-slate-700 px-4 py-2 shadow-md backdrop-blur-3xl  "
                }
                animate={{
                  scale: page == cursor ? 1.1 : 1,
                  color: page == cursor ? "#020617" : "#fff",
                  backgroundColor: page != cursor ? "" : "#6365f187",
                }}
              >
                {page}
              </motion.div>
            </button>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}
