"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsFillBalloonHeartFill } from "react-icons/bs";

const SupporterHearts = ({
  supporterLevel,
}: {
  supporterLevel: number | null | undefined;
}) => {
  return (
    <div>
      {!supporterLevel ? (
        <Link
          href="https://osu.ppy.sh/"
          //  open in new tab
          target="_blank"
          rel="noopener noreferrer"
        >
          Support osu!
        </Link>
      ) : (
        <div>
          <motion.div initial={{ top: "unset" }}>
            <BsFillBalloonHeartFill className="fill-red-500" />
          </motion.div>
          {/* <AnimatedHeart /> */}
        </div>
      )}
    </div>
  );
};

export default SupporterHearts;
