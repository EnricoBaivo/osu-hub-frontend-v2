import { api } from '@/trpc/server'
import React from 'react'
import AnimeDetail from './AnimieDetailComponent';

export default async function page({
    params,
    searchParams,
}: {
    params?: { beatmapset_id: string };
    searchParams?: Record<string, string>;
}) {
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
