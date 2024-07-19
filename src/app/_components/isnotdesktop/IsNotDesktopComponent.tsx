"use client"
import React from 'react'
import RandomOsuHubBackground from '../UI/RandomOsuHubBackground/RandomOsuHubBackground';

export default function IsNotDesktopComponent({ username }: { username?: string | null | undefined }) {
    return (
        <main className="flex filter-{blur(15px)} relative h-full w-full flex-col items-center justify-center bg-gradient-to-b from-osuhub-dark-ice-grey to-osuhub-dark-ice-blue text-white">
            <div className="container flex flex-col items-center justify-center gap-8 px-4  ">
                <RandomOsuHubBackground />
                <div className="z-10 backdrop-blur-xl p-16 rounded-4xl bg-osuhub-dark-ice-blue flex flex-col ">
                    <div>
                        <h1 className="text-2xl lg:text-9xl drop-shadow-sm font-extrabold tracking-tight sm:text-[5rem]">
                            osu! <span className="text-[hsl(280,100%,70%)]">HUB</span>
                        </h1>
                    </div>
                    <h2 className='text-osuhub-yellow'>Hey {username ? username : ""},</h2>
                    <p>nice that you want to checkout Osu hub.</p>
                    <p>Sadly, we diddnt made this webseite fully responsive, so check us out on a Tablet or Desktop</p>
                </div>
            </div>

        </main>
    )
}
