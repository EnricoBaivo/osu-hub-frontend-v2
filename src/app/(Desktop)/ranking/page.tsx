import React from 'react'

import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import { env } from '@/env.mjs';
import RandomOsuHubBackground from '@/app/_components/UI/RandomOsuHubBackground/RandomOsuHubBackground';
import LatestScoresComponent from '@/app/_components/LatestScores/LatestScoresComponent';

export default async function page() {
    const session = await auth();
    if (!session) return redirect(env.TO_LOGIN_PAGE);
    return (<>
        <RandomOsuHubBackground />
        <div className='flex flex-col items-center justify-center w-full h-full'>

            <LatestScoresComponent />
        </div>
    </>
    )
}
