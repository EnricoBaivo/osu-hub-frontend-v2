import StatsBubble from '@/app/_components/Profile/UserStats/StatsBubble';
import { api } from '@/trpc/server';
import React from 'react'

export default async function HighestScoreFromTodayComponent({osu_user_id}: {osu_user_id: number}) {
    const highestScore = await api.score.highestScoreFromDay.query({
        osuUserId: osu_user_id,
        day: 0,
      });
    return (
        <StatsBubble title="Todays Highest Score:" data={highestScore ? highestScore.score : "Lets seee what you will reach today"} />
    )
}
