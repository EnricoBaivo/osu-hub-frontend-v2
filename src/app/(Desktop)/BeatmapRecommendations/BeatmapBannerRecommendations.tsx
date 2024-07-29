"use client"
import { api } from "@/trpc/react";
import React from "react";
import type { BeatmapRecommendationState } from "./UserRecommendationsFilter";

import BeatmapBannerRecommendation from "./BeatmapBannerRecommendation";
import ScrollToTopButton from "../../_components/UI/Button/ScrollToTopButton";
import { Headline } from "../../_components/UI/Typography/Headline";
import ElapsedTimer from "../../_components/UI/Time/ElapsedTimer";


interface BeatmapBannerRecommendationsProps {
    BeatmapRecommendationState: BeatmapRecommendationState;

}

const BeatmapBannerRecommendations: React.FC<BeatmapBannerRecommendationsProps> = ({ BeatmapRecommendationState }) => {
    const {
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        ...result
    } = api.prediction.recommendation.useInfiniteQuery({
        lower_acc: BeatmapRecommendationState?.userPrecitions?.acc[0.5] ? Math.floor(BeatmapRecommendationState.userPrecitions.acc[0.5]) : undefined,
        upper_acc: BeatmapRecommendationState?.userPrecitions?.acc[0.99] ? Math.ceil(BeatmapRecommendationState.userPrecitions.acc[0.99]) : undefined,
        lower_pp: BeatmapRecommendationState?.userPrecitions?.pp[0.5] ?? undefined,
        upper_pp: BeatmapRecommendationState?.userPrecitions?.pp[0.99] ?? undefined,
        lower_od: BeatmapRecommendationState?.userPrecitions?.od[0.5] ?? undefined,
        upper_od: BeatmapRecommendationState?.userPrecitions?.od[0.99] ?? undefined,
        lower_ar: BeatmapRecommendationState?.userPrecitions?.ad[0.5] ?? undefined,
        upper_ar: BeatmapRecommendationState?.userPrecitions?.ad[0.99] ?? undefined,
        lower_cs: BeatmapRecommendationState?.userPrecitions?.cs[0.5] ?? undefined,
        upper_cs: BeatmapRecommendationState?.userPrecitions?.cs[0.99] ?? undefined,
        lower_hp: BeatmapRecommendationState?.userPrecitions?.hp[0.5] ?? undefined,
        upper_hp: BeatmapRecommendationState?.userPrecitions?.hp[0.99] ?? undefined,
        lower_star: BeatmapRecommendationState?.userPrecitions?.star[0.5] ?? undefined,
        upper_star: BeatmapRecommendationState?.userPrecitions?.star[0.99] ?? undefined,
        lower_duration: BeatmapRecommendationState.duration[0],
        upper_duration: BeatmapRecommendationState.duration[1],
        lower_bpm: BeatmapRecommendationState?.userPrecitions?.bpm[0.5] ?? undefined,
        upper_bpm: BeatmapRecommendationState?.userPrecitions?.bpm[0.99] ?? undefined,
        sort_for_latest: BeatmapRecommendationState.sortForLatest,
        sort_for_animie: BeatmapRecommendationState.sortForAnimie,
        mods: BeatmapRecommendationState.mods,
        limit: 5
    }
        , {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            refetchOnWindowFocus: false,
            initialCursor: 0, // <-- optional you can pass an initialCursor
        }
    );
    const loaderDiv = React.useRef<HTMLDivElement>(null);
    // div observer for infinite scrolling
    const observerRef = React.useRef<IntersectionObserver>();
    React.useEffect(() => {
        if (!observerRef.current)
            observerRef.current = new IntersectionObserver((entries) => {
                const firstEntry = entries[0];
                if (firstEntry && firstEntry.isIntersecting) {
                    fetchNextPage().then(() => console.log("fetched next page")).catch((e) => console.log(e));
                }
            });
    }, [fetchNextPage]);


    React.useEffect(() => {
        if (!loaderDiv.current || !observerRef.current) return;
        observerRef.current.observe(loaderDiv.current);
        return () => {
            if (!observerRef.current) return;
            observerRef.current.disconnect();
        };
    }, [loaderDiv, observerRef]);

    return <div className="flex flex-col w-full items-center justify-center pt-14 ">
        <div className="flex flex-wrap justify-center h-full gap-12" >
            {
                !result.isLoading ? result.data?.pages.map((page) =>
                    <>
                        {page.res.map((prediciton) =>

                            <BeatmapBannerRecommendation key={(prediciton.beatmap_id ?? 0)} beatmapRec={prediciton} />
                        )}
                        <span id="spacer" className="flex w-full h-12">

                        </span>
                        {/* spacer */}
                    </>
                ) : <div className="flex flex-col items-center justify-center">
                    loading...
                    <Headline headlineNumber={2}>Less filtering means more waiting !</Headline>
                    <ElapsedTimer start={new Date().getTime()} />
                    <p className="py-12 font-semibold text-xl"> TIP: Hold the Duration filter low </p>
                    <p className="py-12 font-semibold text-xl">Loading 50 Beatmap recomendations</p>
                </div>
            }
            {!result.isLoading && result?.data?.pages[0]?.res.length === 0 ? <div className="flex flex-col items-center justify-center gap-4">
                <Headline headlineNumber={2}>No Beatmaps found</Headline>
                <Headline headlineNumber={3}>Less filtering means more waiting !</Headline>
                <div className="text-lg">Try to adjust the filters</div>
                <p>
                    To improve your beatmap recommendations, focus on increasing the Star Rating and Overall Difficulty, especially if you&apos;ve selected a high pp threshold.
                </p>
            </div> : null
            }
        </div>
        <div className="bg-slate-700-200 h-16 w-full" ref={loaderDiv} />
        <div className="flex flex-row gap-4 fixed bottom-0">
            <div>Page: {result.isFetching ? "Loading ....." : result.data?.pages.length}</div>
            <div>{hasNextPage ? "There is more you can scroll" : "You found the end ups"}</div>
            <div> Total results: {result.data?.pages.reduce((acc, e) => {
                return acc + e.res?.length;
            }, 0).toString()
            }</div>
            <ScrollToTopButton />

        </div>
    </div>;

}

export default BeatmapBannerRecommendations;