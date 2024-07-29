"use client"
import { useRef, useState } from "react";
import ButtonNodge from "../../_components/UI/Button/ButtonNodge";
import RangeSlider from "../../_components/UI/RangeSlider/RangeSlider";
import type { UserPrediction } from "@/server/api/routers/beatmapset";
import BeatmapBannerRecommendations from "./BeatmapBannerRecommendations";

import DurationFilter from "../../_components/UI/Input/DurationFilter";

import ScoreMods from "../../_components/ScoreBeatmapBanner/ScoreMods/ScoreMods";
import { Mods } from "@/lib/Mod";



export type BeatmapRecommendationState = {
    userPrecitions: UserPrediction;
    beatmapset_id: number;
    beatmap_id: number;
    beatmapArtist: string;
    beatmapVersion: string;
    beatmapsetTitle: string;
    beatmapsetCreator: string;
    beatmapsetMode: number;
    beatmapHasPredictions: boolean;
    sortForLatest: boolean;
    sortForAnimie: boolean;
    duration: number[];
    mods: number;
};
const UserRecommendationsFilter = ({ userPrediction }: { userPrediction: UserPrediction }) => {
    const initialBeatmapPredictionState = {
        userPrecitions: userPrediction,
        beatmapset_id: 0,
        beatmap_id: 0,
        beatmapArtist: "",
        beatmapVersion: "",
        beatmapsetTitle: "",
        beatmapsetCreator: "",
        beatmapsetMode: 0,
        beatmapHasPredictions: true,
        sortForLatest: false,
        sortForAnimie: false,
        duration: [40, 80],
        mods: 0
    };
    const [beatmapState, setBeatmapState] = useState(initialBeatmapPredictionState);
    const beatmapTempState = useRef(initialBeatmapPredictionState);


    const updateTempBeatmapState = (
        key: keyof BeatmapRecommendationState,
        updater: (prevState: BeatmapRecommendationState[keyof BeatmapRecommendationState]) => BeatmapRecommendationState[keyof BeatmapRecommendationState]
    ) => {
        beatmapTempState.current = {
            ...beatmapTempState.current,
            [key]: updater(beatmapTempState.current[key]),
        };

    };

    function changeUserPredictionState(key: keyof UserPrediction, value: number[]) {
        updateTempBeatmapState("userPrecitions", (prev: UserPrediction | string | number | boolean | number[] | [number, number]) => {
            if (typeof prev === 'object' && prev !== null) {
                return {
                    ...prev as UserPrediction,
                    [key]: {
                        "0.5": value[0],
                        "0.99": value[1]
                    },
                };
            } else {
                return prev; // You might want to adjust this based on your logic
            }
        })
    }

    return (
        <>
            <div className="flex justify-center w-11/12 flex-wrap gap-4 text-white font-light tracking-wider text-2xl py-12 px-6 backdrop-blur-lg rounded-2xl ">
                <RangeSlider
                    callback={(e) => changeUserPredictionState("pp", e)}
                    title={"PP Range"}
                    anker={"pp"}
                    className={"w-full"}
                    default={[Math.floor(userPrediction.pp[0.5] ?? 0), Math.ceil(userPrediction.pp[0.99] ?? 1000)]} range={[0, 1000]} step={5}
                    minStepsBetweenThumbs={1} />
                <RangeSlider
                    callback={(e) => changeUserPredictionState("acc", [Math.floor(e[0] ?? 0), Math.ceil(e[1] ?? 100)])}
                    className={"w-1/5"}
                    title={"Accuracy"}
                    anker={"%"}
                    default={[Math.floor(userPrediction.acc[0.5] ?? 0), Math.ceil(userPrediction.acc[0.99] ?? 100)]}
                    range={[85, 100]}
                    step={0.5}
                    minStepsBetweenThumbs={0.4} />
                <RangeSlider className={"w-1/4"}
                    callback={(e) => changeUserPredictionState("od", e)}
                    title={"Overall Difficulty"}
                    default={[Math.floor(userPrediction.od[0.5] ?? 0), Math.ceil(userPrediction.od[0.99] ?? 10)]}
                    range={[0, 13]} step={0.5} minStepsBetweenThumbs={0.4} />
                <RangeSlider className={"w-1/4"}
                    callback={(e) => changeUserPredictionState("ad", e)}
                    title={"Approach Rate"}
                    default={[Math.floor(userPrediction.ad[0.5] ?? 0), Math.ceil(userPrediction.ad[0.99] ?? 10)]}
                    range={[0, 12]} step={0.5} minStepsBetweenThumbs={0.4} />
                <RangeSlider className={"w-1/4"}
                    callback={(e) => changeUserPredictionState("cs", e)}
                    title={"Circle Size"}
                    default={[Math.floor(userPrediction.cs[0.5] ?? 0), Math.ceil(userPrediction.cs[0.99] ?? 10)]}
                    range={[0, 10]} step={0.5} minStepsBetweenThumbs={0.4} />
                <RangeSlider className={"w-1/4"}
                    callback={(e) => changeUserPredictionState("hp", e)}
                    title={"HP Drain"}
                    default={[Math.floor(userPrediction.hp[0.5] ?? 0), Math.ceil(userPrediction.hp[0.99] ?? 10)]}
                    range={[0, 10]} step={0.5} minStepsBetweenThumbs={0.4} />
                <RangeSlider className={"w-1/4"}
                    callback={(e) => changeUserPredictionState("star", e)}
                    title={"Star Rating"}
                    default={[Math.floor(userPrediction.star[0.5] ?? 0), Math.ceil(userPrediction.star[0.99] ?? 10)]}
                    range={[0, 10]} step={0.5} minStepsBetweenThumbs={0.4} />

                <RangeSlider className={"w-1/4"}
                    callback={(e) => changeUserPredictionState("bpm", e)}
                    title={"BPM"}
                    default={[Math.floor(userPrediction.bpm[0.5] ?? 0), Math.ceil(userPrediction.bpm[0.99] ?? 10)]}
                    range={[60, 350]} step={30} minStepsBetweenThumbs={0.4} />

                <DurationFilter defaultV={beatmapState.duration}
                    updateDurationFilter={(e) => updateTempBeatmapState("duration", () => e)} />

                <ButtonNodge type="button" className="grow" onClick={() => setBeatmapState(() => { return beatmapTempState.current })}>
                    {"Update"}
                </ButtonNodge>
                <ScoreMods mods={["HardRock", "NoMod", "Easy", "Hidden", "DoubleTime", "Flashlight"]} setActive={(e) => {
                    const modsNumerical = e.map(mod => Mods.fromString(mod));
                    console.log(e, modsNumerical);
                    const modsCombined = modsNumerical.reduce((acc, val) => acc | val, 0);
                    console.log(modsCombined);
                    updateTempBeatmapState("mods", () => modsCombined)
                }} />
                <ButtonNodge type="button" className="shrink" onClick={() => {
                    updateTempBeatmapState("sortForLatest", (prev) => !prev)
                    setBeatmapState(() => { return beatmapTempState.current })
                }}>
                    {beatmapState.sortForLatest ? "Sort by id" : "Sort by newest"}
                </ButtonNodge>
                <ButtonNodge type="button" className="shrink" onClick={() => {
                    updateTempBeatmapState("sortForAnimie", (prev) => !prev)
                    setBeatmapState(() => { return beatmapTempState.current })
                }}>
                    {beatmapState.sortForAnimie ? "all beatmaps" : "animie beatmaps"}
                </ButtonNodge>
            </div >


            <section className="flex w-full  text-white font-exo ">
                <BeatmapBannerRecommendations
                    BeatmapRecommendationState={beatmapState}
                />
            </section>

        </>
    )
}
export default UserRecommendationsFilter