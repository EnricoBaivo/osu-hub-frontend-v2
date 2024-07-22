
"use client"
import { MedalInterface } from '@/hooks/useFetchMedals';
import Image from 'next/image';
import React, { useEffect } from 'react'
import ToolTip from '../../UI/ToolTip/ToolTip';
import { UserAchievement } from 'osu-web.js';
import clsx from 'clsx';
import { motion } from 'framer-motion';


const MedalComponent = ({ medalId, medal, userAchievment, onlyReached }: { medalId: number, userAchievment?: UserAchievement, medal: MedalInterface, onlyReached?: boolean }) => {
    const MotionImage = motion(Image)




    if (!medal || (onlyReached && !userAchievment)) {
        return null;
    }
    return (
        <ToolTip margin={2} DisplayElement={
            <MotionImage whileHover={{ scale: 1.1 }} className={clsx({ "saturate-0": !userAchievment })} src={medal.Link} alt={medal.Name} width={75} height={75} />
        } >

            <div className="font-exo text-md font-bold">{medal.Name}</div>
            <p>Description {medal.Description}</p>
            <p>Ordering {medal.Ordering}</p>
            <p>Instructions {medal.Instructions}</p>
            <p>SolutionFound {medal.SolutionFound}</p>
            <p>Lazer {medal.Lazer}</p>
            <p>ModeOrder {medal.ModeOrder}</p>
            <p>Mods {medal.Mods}</p>
            <p>Rarity {medal.Rarity}</p>
            {medal.Video && <p> "Video" {medal.Video}</p>}
            <p>PackID {medal.PackID}</p>
            <p>Link {medal.Link}</p>




        </ToolTip>

    );
};
export default MedalComponent;