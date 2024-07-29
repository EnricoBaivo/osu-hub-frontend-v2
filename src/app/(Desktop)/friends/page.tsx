import { auth } from '@/server/auth';
import { api } from '@/trpc/server';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import FriendsScore from './FriendsScore';
import { Headline } from '../../_components/UI/Typography/Headline';
import FriendsComponent from './FriendsComponent';

export default async function page() {
    const session = await auth();

    if (!session?.user.osu_user_id) {
        redirect("/auth/login");
    }
    return (
        <div className='flex flex-col w-full items-center text-white overflow-y-auto'>
            <Headline classNames='mb-12' >Friends</Headline>
            <div className='container flex flex-col gap-12'>
                <Suspense fallback={<div>Loading...</div>}>
                    <FriendsComponent osu_user_id={session.user.osu_user_id} />
                </Suspense>
            </div>
        </div>
    )
}
