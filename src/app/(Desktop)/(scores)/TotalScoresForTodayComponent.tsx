import StatsBubble from '@/app/_components/Profile/UserStats/StatsBubble';
import { api } from '@/trpc/server';
import React from 'react'

export default async function TotalScoresForTodayComponent({osu_user_id}: {osu_user_id: number}) {
    const totalScoresForDay = await api.score.totalScoresForDay.query({
        user_id: osu_user_id,
        day: 0,
      });
    
  return (
    <StatsBubble title="Today Played:" data={totalScoresForDay} />
  )
}
