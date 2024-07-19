
import React, { Suspense } from 'react'
import { SkeletonCard } from '../../_components/UI/SkeltonCard';
import { SkeltonCardBeatmapsetBanner } from '../../_components/UI/SkeltonCardBeatmapsetBanner';
import BeatmapScoreBanner from '../(scores)/BeatmapScoreBanner';

type FriendsScoreProps = {

    userScoresIdsData?: number[];
}
export default function FriendScore({ userScoresIdsData }: FriendsScoreProps) {

    if (!userScoresIdsData) return <SkeletonCard />

    return (
        userScoresIdsData?.length > 0 && <>
            <h2 className='py-2 px-4'>Latest Scores:</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
                {userScoresIdsData.map((score_id) => (
                    <div key={score_id} className='flex grow w-[900px] scale-90' >
                        <Suspense fallback={<SkeltonCardBeatmapsetBanner height={900} width={900} />}>
                            <BeatmapScoreBanner

                                score_id={Number(score_id)}
                            />
                        </Suspense>
                    </div>
                ))}
            </div>
        </>
    )
}
