"use client";
import { AnimatePresence, useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import VolumeControl from '@/app/_components/UI/AudioPlayer/VolumeControl';
import { type Covers } from 'osu-web.js';
import AniListNote from '@/app/_components/UI/AniList/AniListNote';
export type beatmapMetaDataType = {
    title: string;
    covers: Covers;
    artist: string;
    author: string;
    version: string;
    creator: string;
    cover: string;
    beatmapset_id: number;
    beatmap_id: number;
    preview_url: string;
    url: string;
    hasAniList: boolean;
}
interface AudioStateContextProps {
    meta: beatmapMetaDataType | null;
    src: string | null;
    currentlyPlaying: boolean;
    setMetaState: (meta: beatmapMetaDataType) => void,
    setSrcState: (src: string) => void;
    setCurrentlyPlayingState: (play: boolean) => void;
}
const AudioStateContext = React.createContext<AudioStateContextProps>({
    meta: null,
    src: "",
    currentlyPlaying: false,
    setMetaState: (meta: beatmapMetaDataType) => { },
    setSrcState: (src: string) => { },
    setCurrentlyPlayingState: (play: boolean) => { }
});
// new line custom hook
export const useAudio = () => React.useContext(AudioStateContext)

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentlyPlaying, setCurrentlyPlaying] = React.useState<boolean>(false)
    const [src, setSrc] = React.useState<string | null>(null);
    const volume = useMotionValue<number>(50); // Default volume level
    const progressV = useMotionValue<number>(0);
    const [meta, setMeta] = React.useState<beatmapMetaDataType | null>(null);

    const setSrcState = (src: string) => {
        setSrc(src)
    }
    const setCurrentlyPlayingState = (play: boolean) => {
        setCurrentlyPlaying(play)
    }
    const setMetaState = (meta: beatmapMetaDataType) => {
        setMeta({ ...meta })
    }
    const ref = React.useRef<HTMLAudioElement | null>(null)


    React.useEffect(() => {
        function ended() {
            setCurrentlyPlaying(false)
            progressV.set(0)

        }
        function progressUpdate(this: HTMLAudioElement, ev: Event) {
            console.log("progress update", this.currentTime, this.duration)
            progressV.set((this.currentTime / this.duration))
        }
        if (ref.current) {
            const audio = ref.current
            audio.addEventListener("ended", ended)
            audio.addEventListener("timeupdate", progressUpdate)

        }
        return () => {
            if (ref.current) {
                const audio = ref.current
                audio.removeEventListener("ended", ended)
                audio.removeEventListener("timeupdate", progressUpdate)
            }
        }

    }, [ref])




    React.useEffect(() => {
        const audio = ref.current
        if (!audio) return;
        if (currentlyPlaying) {
            audio.src = "https:" + src;
            audio.play().then(
                () => {
                    console.log("playing");

                },
                () => {
                    console.log("failed to play");
                }
            ).catch((e) => {
                console.log("catched error: " + e);
            }
            );
        } else if (audio.src === "https:" + src) {
            audio.pause();
        }
    }, [src, currentlyPlaying]);

    useMotionValueEvent(volume, "change", (prevValue) => {
        if (ref.current) {
            const audio = ref.current
            const newVolume = prevValue / 100
            console.log("volume", newVolume)

            audio.volume = newVolume
        }
    })

    return <AudioStateContext.Provider value={{ meta, src, currentlyPlaying, setMetaState, setSrcState, setCurrentlyPlayingState }}>
        {children}
        <audio title={meta?.url ?? ""} ref={ref} controls id="audio-player" aria-hidden className='hidden' />
        <AnimatePresence>

            {meta && <motion.div
                initial={{
                    opacity: 0,
                    y: "100%"
                }}
                animate={{
                    opacity: 1,
                    y: -8
                }}
                exit={
                    {
                        opacity: 0,
                        y: "100%"

                    }
                }
                className='fixed z-50 bg-osuhub-dark-ice-grey bottom-0 right-10 w-[375px] h-[175px] border border-slate-500  backdrop-blur-xl text-white rounded-lg overflow-hidden flex flex-col justify-between'
            >
                <Image
                    unoptimized
                    quality={100}
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                    src={meta?.covers?.cover ?? "/defaultBeatmapBanner.png"}
                    // src={`https://assets.ppy.sh/beatmaps/${meta?.id}/covers/cover.jpg`}
                    alt={
                        "backgroundcover for " +
                        meta?.artist +
                        " " +
                        meta?.title
                    }
                    className='z-10 opacity-70'
                />
                <div className='flex items-center gap-2 font-exo text-base font-black uppercase z-50 w-full'>
                    {meta?.covers &&
                        <a className="pl-2 w-full" href={meta?.url ?? ""} target='_blank'>
                            <p className=' text-osuhub-yellow flex items-center gap-2'>
                                {meta?.title}
                                <AniListNote beatmapset_id={meta?.beatmapset_id} hasAniList={meta?.hasAniList} />

                            </p>
                            <p >by {meta?.artist}</p>

                        </a>
                    }

                </div>
                <VolumeControl progress={progressV} volume={volume} setIsPlaying={setCurrentlyPlaying} isPlaying={currentlyPlaying} />

            </motion.div>}


        </AnimatePresence>

    </AudioStateContext.Provider >
}
