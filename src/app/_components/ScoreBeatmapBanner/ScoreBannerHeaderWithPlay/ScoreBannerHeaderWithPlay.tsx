
import { beatmapMetaDataType, useAudio } from "@/hooks/useAudio";
import { motion } from "framer-motion";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";

const ScoreBannerHeaderWithPlay = ({ beatmapMetaData }: { beatmapMetaData: beatmapMetaDataType }) => {
  const { src, currentlyPlaying, setMetaState, setSrcState, setCurrentlyPlayingState } = useAudio()
  const handleClick = () => {
    if (!beatmapMetaData.preview_url) return;
    if (src === beatmapMetaData.preview_url) {
      setCurrentlyPlayingState(!currentlyPlaying);
    } else {
      setSrcState(beatmapMetaData.preview_url);
      setMetaState(beatmapMetaData);
      setCurrentlyPlayingState(true);
    }
  }
  return (
    <div className="flex w-[550px] justify-between gap-8 rounded-br-4xl rounded-tl-4xl bg-osuhub-dark-ice-blue bg-opacity-20 px-10 py-4 shadow backdrop-blur-md">
      <div className="flex flex-col gap-2.5">
        <div className="font-exo text-xl font-black uppercase text-white">
          {beatmapMetaData.author}
        </div>

        <div className="font-exo text-xl font-semibold uppercase text-white">
          {beatmapMetaData.title}
        </div>

        <div className="flex items-center justify-start gap-2.5">
          <div className="font-exo tracking-wider text-center font-normal uppercase text-white hover:text-osuhub-gray">
            [{beatmapMetaData.version}]
          </div>
          <div className="font-exo tracking-wider text-center font-normal uppercase text-white hover:text-osuhub-gray">
            Created by
          </div>
          <div className="font-exo tracking-wider text-center font-normal uppercase text-white hover:text-osuhub-gray">
            {beatmapMetaData.creator}
          </div>
        </div>

      </div>
      <motion.button
        whileHover={{
          scale: 1.1
        }}
        title="play preview"
        role="button"
        onClick={handleClick}
        className="text-white hover:text-yellow-500 flex items-center text-3xl justify-center "
      >
        {src == beatmapMetaData.preview_url && currentlyPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
      </motion.button>
    </div>
  );
};

export default ScoreBannerHeaderWithPlay;
