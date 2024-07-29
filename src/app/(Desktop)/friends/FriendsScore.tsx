
import { score_types } from '@/lib/getUserRecentGames';
import React from 'react'

import type { UserExtended } from 'osu-web.js';
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

import Image from 'next/image';
import SpotlightLightText from '../../_components/UI/SpotlightText';
import clsx from 'clsx';
import Link from 'next/link';
import FriendScore from './FriendScore';
import { api } from '@/trpc/server';
import { motion } from 'framer-motion';
import AnimatedImage from './AnimatedImage';

type FriendsScoreProps = {
    friend: UserExtended;
    is_passed?: boolean | undefined;
    scoretype?: string[];
    is_perfect?: boolean | undefined;
    skip?: number;
    limit?: number;
    myRank?: number;
}
export default async function FriendsScore({ myRank, friend, is_passed, scoretype = [score_types.score_osu, score_types.score_best_osu, "solo_score"], is_perfect, skip, limit }: FriendsScoreProps) {

    const userScoresIdsData = await api.score.getUserScoresIds.query({
        is_passed: is_passed ?? true,
        scoretype: scoretype,
        user_id: friend.id,
        only_perfect: is_perfect ?? false,
        skip: skip ?? 0,
        limit: limit ?? 5,
    }
    );

    return (
        <div className={clsx('relative container h-[880px] z-10  rounded-4xl  overflow-hidden', {
            "h-auto": userScoresIdsData.length === 0
        })}>
            <Image unoptimized fill src={friend.cover.url} alt={friend.username + " cover image"} className='absolute -z-10' />
            <div className={clsx('h-full w-full flex flex-col z-30 bg-osuhub-dark-ice-blue backdrop-blur-lg')}>
                <div className='py-6 px-12 flex flex-row items-center gap-8 text-white  backdrop-blur-3xl border-white/10  border-b'>
                    <Link href={`/user/${friend.id}`}

                        className={clsx(
                            "border border-slate-700 flex items-center justify-center rounded-full w-24 h-24 drop-shadow-xl left-16 p-1 overflow-hidden",
                            {

                                " bg-slate-800  border-osuhub-dark-ice-blue":
                                    !friend.is_online,
                            },

                            {
                                "bg-green-400/60  backdrop-blur-3xl before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-green-100 before:to-transparent":
                                    friend.is_online,
                            },
                        )}
                    >
                        <AnimatedImage

                            src={friend.avatar_url}
                            alt="avatar"
                            className="rounded-full"
                            width={90}
                            height={90}
                        />
                    </Link>
                    <div className='flex flex-col w-40 '>
                        <h2>{friend.username}</h2>
                        <SpotlightLightText title={friend.statistics.global_rank} subtitle={"Rank"} />
                    </div>
                    {myRank && <div className='flex h-full justify-end flex-col grow'>
                        <span className={clsx('flex items-center  font-black uppercase text-osuhub-green text-2xl',
                            {
                                "text-osuhub-red":

                                    (friend?.statistics?.global_rank ?? 0) - myRank < 0
                            },
                        )}>{Math.abs((friend?.statistics?.global_rank ?? 0) - myRank)}</span>
                        <div className={clsx('flex items-end text-md font-semibold uppercase', {
                            "text-osuhub-green": (friend?.statistics?.global_rank ?? 0) - myRank > 0,
                            "text-osuhub-red": (friend?.statistics?.global_rank ?? 0) - myRank < 0,
                            "text-osuhub-yellow": (friend?.statistics?.global_rank ?? 0) - myRank == 0,
                        })} > {

                                (friend?.statistics?.global_rank ?? 0) - myRank > 0
                                    ? <>
                                        ahead
                                        <FaLongArrowAltUp />
                                    </>

                                    :
                                    <>
                                        behind
                                        <FaLongArrowAltDown />
                                    </>
                            }</div>

                    </div>
                    }

                </div>

                <FriendScore
                    userScoresIdsData={userScoresIdsData}
                />

            </div>
        </div >
    )
}
