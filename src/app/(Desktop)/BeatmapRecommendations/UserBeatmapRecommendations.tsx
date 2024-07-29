import { api } from '@/trpc/server';
import React from 'react'
import UserRecommendationsFilter from './UserRecommendationsFilter';

export default async function UserBeatmapRecommendations({ osu_user_id }: { osu_user_id: number }) {
    const dat = await api.prediction.getPlayerBeatmapPredictions.query({ player_id: osu_user_id });

    return (dat &&
        <UserRecommendationsFilter userPrediction={dat} />
    )
}
