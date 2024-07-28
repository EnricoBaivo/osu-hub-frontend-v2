"use client";
import { beatmapMetaDataType, useAudio } from '@/hooks/useAudio';
import React from 'react'
import { motion } from 'framer-motion';
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from 'react-icons/tb';

export default function PlayButton({ beatmapMetaData }: { beatmapMetaData: beatmapMetaDataType }) {
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
    )
}
