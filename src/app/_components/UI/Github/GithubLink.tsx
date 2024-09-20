"use client"
import Link from 'next/link'
import React from 'react'
import ButtonNodge from '../Button/ButtonNodge'
import { FaGithub } from 'react-icons/fa6'

export default function GithubLink() {
    return (
        <Link href="https://github.com/EnricoBaivo/osu-hub-frontend-v2" target="_blank">
            <ButtonNodge className='text-base flex flex-row items-center justify-center gap-2 normal-case'>
                <FaGithub />
                Start contributing

            </ButtonNodge>
        </Link>
    )
}
