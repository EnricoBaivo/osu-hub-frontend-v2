"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react'
import { SiAnilist } from 'react-icons/si';
export default function AniListNote({ beatmapset_id, hasAniList }: { beatmapset_id: number, hasAniList: boolean }) {
    const MotionLink = motion(Link)
    return (
        hasAniList &&
        <MotionLink whileHover={{ scale: 1.1 }} href={`/beatmapsets/${beatmapset_id}`} className='text-lg w-4 h-4'>
            <SiAnilist />
        </MotionLink >

    )
}
