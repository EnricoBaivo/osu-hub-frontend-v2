"use client";
import { motion } from "framer-motion";
import { RiDownload2Line, RiVideoDownloadLine } from "react-icons/ri";
import { PiGameControllerDuotone } from "react-icons/pi";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import Link from "next/link";
import { useState } from "react";
import { beatmapMetaDataType, useAudio } from "@/hooks/useAudio";

export const BeatmapMediaButtons = ({
  beatmapset_video,
  preview_url,
  beatmapMetaData
}: {

  beatmapset_video: boolean | null | undefined;
  preview_url: string | null | undefined;
  beatmapMetaData: beatmapMetaDataType;

}) => {
  const [isHovering, setIsHovering] = useState(false);
  const { src, currentlyPlaying, setMetaState, setSrcState, setCurrentlyPlayingState } = useAudio()
  const handleClick = () => {
    if (!preview_url) return;
    if (src === preview_url) {
      setCurrentlyPlayingState(!currentlyPlaying);
    } else {
      setSrcState(preview_url);
      setMetaState(beatmapMetaData);
      setCurrentlyPlayingState(true);
    }
  }

  return (
    <motion.div
      dragMomentum
      initial={{ opacity: 0, top: 0, scale: 0.9 }}
      animate={{ opacity: 1, top: 0, scale: 1 }}
      exit={{ opacity: 0, top: 0, scale: 0.9 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex pl-8  pr-4 flex-col h-full  z-10 items-center justify-center"
    >

      <motion.div className="relative w-20 h-20  text-2xl text-slate-700">
        {
          <motion.a
            initial={{ opacity: 0, top: 0, scale: 0.9 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              top: isHovering ? 100 : 0,
              scale: isHovering ? 1 : 0.9,
            }}
            whileHover={{
              scale: 1.1
            }}
            onClick={() => setCurrentlyPlayingState(false)}
            href={"osu://b/" + beatmapMetaData.beatmap_id}
            title="Jump to osu!direct"
            role="button"
            className="absolute hover:text-yellow-500  backdrop-blur-3xl bg-osuhub-dark-ice-blue flex items-center w-20 h-20 justify-center rounded-full shadow-xl border-slate-700 border "
          >
            <PiGameControllerDuotone />
          </motion.a>
        }
        {/* play sound button */}
        {preview_url && (
          <motion.button
            whileHover={{
              scale: 1.1
            }}
            title="play preview"
            role="button"
            onClick={handleClick}
            className=" backdrop-blur-3xl text-white hover:text-yellow-500 bg-osuhub-dark-ice-blue flex items-center w-20 h-20 justify-center rounded-full shadow-xl border-slate-700 border "
          >
            {src == preview_url && currentlyPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
          </motion.button>
        )}

        <motion.div
          className=" absolute backdrop-blur-3xl hover:text-yellow-500 bg-osuhub-dark-ice-blue flex items-center w-20 h-20 justify-center rounded-full shadow-xl border-slate-700 border "
          initial={{ opacity: 0, top: 0, scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            top: isHovering ? -100 : 0,
            scale: isHovering ? 1 : 0.9,
          }}

        >
          <Link
            href={
              "https://osu.ppy.sh/beatmapsets/" + beatmapMetaData.beatmapset_id + "/download"
            }
            target="_blank"
            title="play preview"
            role="button"
            className="flex items-center w-20 h-20 justify-center "
          >
            {beatmapset_video ? <RiVideoDownloadLine /> : <RiDownload2Line />}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div >
  );
};
export default BeatmapMediaButtons;
