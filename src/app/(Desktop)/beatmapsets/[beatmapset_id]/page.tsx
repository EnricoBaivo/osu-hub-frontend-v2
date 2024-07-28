import { api } from '@/trpc/server'
import React from 'react'
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
        return  redirect(env.TO_LOGIN_PAGE);
    }
    const aniListMedia = await api.beatmapset.getAniListMedia.query({
        beatmapset_id: Number(params?.beatmapset_id)
    })
    if (!aniListMedia) {
        return <div>Media not found</div>
    }
    return (

        <AnimeDetail aniListMedia={aniListMedia} />
    );

}
