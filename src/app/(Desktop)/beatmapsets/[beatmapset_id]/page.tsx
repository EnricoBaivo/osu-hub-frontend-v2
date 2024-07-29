import React, { Suspense } from 'react'
import AnimeDetail from './AnimieDetailComponent';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import { env } from '@/env.mjs';

export default async function page({
    params,
    searchParams,
}: {
    params?: { beatmapset_id: string };
    searchParams?: Record<string, string>;
}) {
    const session = await auth()
    if (!session) {
        return redirect(env.TO_LOGIN_PAGE);
    }

    return <div className="overflow-y-auto w-full mt-12">
        <div className="relative flex flex-col items-center gap-12" >
             <Suspense fallback={<div>Loading...</div>}>
                <AnimeDetail beatmapset_id={Number(params?.beatmapset_id)} />
            </Suspense> 
        </div>
    </div>

}
