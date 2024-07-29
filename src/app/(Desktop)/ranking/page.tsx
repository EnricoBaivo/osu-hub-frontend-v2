import React, { Suspense } from 'react'

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
            <div className='container h-4/5 flex flex-col gap-12 z-10  backdrop-blur-xl p-16 rounded-4xl bg-osuhub-dark-ice-blue '>
                <h2 className="text-white">Latest Scores</h2>
                <ul className="flex flex-col overflow-y-auto w-full no-scrollbar gap-2 text-white">
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <LatestScoresComponent />
                    </Suspense>
                </ul >
            </div>
        </div>
    </>
    )
}
