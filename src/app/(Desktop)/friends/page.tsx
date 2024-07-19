import { auth } from '@/server/auth';
import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';
import React from 'react'
import FriendsScore from './FriendsScore';
import { Headline } from '../../_components/UI/Typography/Headline';

export default async function page() {
    const session = await auth();

    if (!session?.user) {
        redirect("/api/auth/signin");
    }
    const friends = await api.user.userFriends.query()
    if (session.user.osu_user_id === null) {
        redirect("/api/auth/signin");
    }
    const me = await api.user.userProfile.query({ osu_user_id: session.user.osu_user_id || 0 })
    
    return (
        <div className='flex flex-col w-full items-center text-white overflow-y-auto'>
            <Headline classNames='mb-12' >Friends</Headline>
            <div className='container flex flex-col gap-12'>
                {
                    friends?.map((friend) => (
                        !friend.is_bot && <FriendsScore key={friend.id} myRank={me?.statistics?.global_rank ?? 0} friend={friend} />
                    ))
                }
            </div>
        </div>
    )
}
