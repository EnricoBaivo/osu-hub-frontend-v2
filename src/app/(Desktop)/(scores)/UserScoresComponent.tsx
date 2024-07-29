import { api } from '@/trpc/server';
import React from 'react'
import BeatmapScoreBanner from './BeatmapScoreBanner';

export default async function UserScoresComponent({
    is_passed,
    scoretype,
    osu_user_id,
    is_perfect,
    skip,
    limit,

}: {
    is_passed: boolean | undefined;
    scoretype: string[];
    osu_user_id: number;
    is_perfect: boolean | undefined;
    skip: number;
    limit: number;
}
) {
    const userScoresIdsData = await api.score.getUserScoresIds.query({
        is_passed: is_passed,
        scoretype: scoretype,
        user_id: osu_user_id,
        only_perfect: is_perfect,
        skip: skip,
        limit: limit,
    });

    return userScoresIdsData.map((score_id) => (
        <BeatmapScoreBanner
            score_id={Number(score_id)}
        />
    ))




}
