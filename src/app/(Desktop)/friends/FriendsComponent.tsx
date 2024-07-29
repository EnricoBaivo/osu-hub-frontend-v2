import { api } from '@/trpc/server'
import React, { Suspense } from 'react'
import FriendsScore from './FriendsScore'

export default async function FriendsComponent({ osu_user_id }: { osu_user_id: number }) {

    const [friends, me] = await Promise.all([api.user.userFriends.query(), api.user.userProfile.query({ osu_user_id: osu_user_id })])
    return (
        friends?.map((friend) => (
            !friend.is_bot &&
            <Suspense fallback={<div className={'relative container h-[880px] w-full z-10  rounded-4xl  overflow-hidden'} />}>
                <FriendsScore key={friend.id} myRank={me?.statistics?.global_rank ?? 0} friend={friend} />
            </Suspense>
        ))
    )
}
