// VolumeControl.tsx
import { MotionValue, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import React, { forwardRef, useEffect, useState, Ref } from 'react';
import { FaVolumeUp, FaVolumeDown, FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';
interface VolumeControlProps {
    isPlaying?: boolean;
    progress: MotionValue<number>;
    setIsPlaying: (isPlaying: boolean) => void;
    volume: MotionValue<number>;

}

const VolumeControl = ({ isPlaying, setIsPlaying, volume, progress }: VolumeControlProps) => {

    const handleVolumeUp = () => {

        volume.set(Math.min(volume.get() + 10, 100));
    };

    const handleVolumeDown = () => {
        volume.set(Math.max(volume.get() - 10, 0));
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };



    return (
        <div className='h-16 w-full flex flex-col items-center   backdrop-blur-xl z-50'>
            <div className='flex grow items-center justify-center space-x-4'>
                <button
                    onClick={handleVolumeDown}
                    className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                    <FaVolumeDown />
                </button>
                <button
                    onClick={handlePlayPause}
                    className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                    onClick={handleVolumeUp}
                    className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
                >
                    <FaVolumeUp />
                </button>
            </div>
            <div className='h-2 w-full' >
                {/* progressbar */}
                <div className='h-full bg-gray-700' >
                    <motion.div
                        style={{ scaleX: progress }}

                        className='h-full bg-osuhub-yellow  origin-left'
                    />
                </div>
            </div>

        </div>
    );
};

export default VolumeControl;
