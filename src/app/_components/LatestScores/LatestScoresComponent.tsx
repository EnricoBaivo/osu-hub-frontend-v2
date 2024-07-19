"use client"
import { api } from "@/trpc/react";
import { Mods, modsToStringList } from "@/lib/Mod";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";


const LatestScoresComponent = () => {
    const scores = api.score.getLatestScores.useQuery(undefined, { refetchInterval: 10000 });


    return (
        <div className='container h-4/5 flex flex-col gap-12 z-10  backdrop-blur-xl p-16 rounded-4xl bg-osuhub-dark-ice-blue '>
            <h2 className="text-white">Latest Scores</h2>
            <ul className="flex flex-col overflow-y-auto w-full no-scrollbar gap-2 text-white">
                {scores.isSuccess && scores.data.sort((a, b) => {
                    if (!b.pp || !a.pp) return 0
                    return b.pp - a.pp
                }).map((score, i) => {
                    const mod = new Mods(score.mods)

                    return <Link key={score.id} href={`/user/${score.osu_user_id}`} >
                        <li
                            className={clsx("flex flex-row w-full gap-2 items-center justify-around border border-slate-800 even:bg-osuhub-dark-ice-grey odd:bg-osuhub-dark-ice-grey p-2 transition-colors hover:bg-osuhub-gray rounded-3xl",
                                score.passed && "bg-osuhub-yellow")}>

                            {score.avatar &&

                                <Image width={48}
                                    height={48} className="rounded-full w-16 h-16" src={score.avatar} alt="avatar" />
                            }
                            <div className="flex flex-grow gap-6">
                                <div> {score.name} </div>
                                <div>Score: {score.score}</div>
                                <div>PP: {score.pp}  </div>
                                <div>{score.beatmap?.title}</div>
                                <div>{score.beatmap?.version}</div>

                            </div>
                            {
                                modsToStringList(mod).map((modstring) => <Image
                                    key={modstring}
                                    alt={modstring}
                                    src={"/mods/" + modstring.toLowerCase() + "@2x.png"}
                                    width={48}
                                    height={22}
                                />)
                            }
                        </li>
                    </Link>
                })}
            </ul >
        </div>
    );
};
export default LatestScoresComponent;