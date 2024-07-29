import Link from "next/link";
import { Headline } from "../UI/Typography/Headline";
import { SkeletonCard } from "../UI/SkeltonCard";
import { FaDiscord } from "react-icons/fa";
import { env } from "@/env.mjs";
import { api } from "@/trpc/server";

interface UserDataLoadedProps {
    length: number;
    osu_user_id: number;
}

const UserDataLoaded = (props: UserDataLoadedProps) => {
    return props.length < 1 && <div className="flex flex-col w-full items-center justify-center gap-24 sm:w-11/12 md:w-5/6">
        <div className="flex items-center text-2xl flex-col w-full h-full">
            <Headline headlineNumber={2} >{"Oh no, your scores arent ready yet !"}</Headline>
            <div className="flex flex-col my-4 text-lg ">
                <p>It seems like you are new to the site, please wait a few minutes until your scores are ready.</p>
                <p>Mean while visit our Discord Server!</p>
                <Link className="my-12 hover:scale-110 transition-all flex flex-row items-center justify-between px-4 py-2 text-indigo-500 hover:text-yellow-500 bg-osuhub-dark-ice-blue border rounded-md w-36" href={env.NEXT_PUBLIC_DISCORD_INVITE_LINK}>
                    <FaDiscord />
                    osu!Hub </Link>
            </div>

            <div className="w-4/6">
                <SkeletonCard isLoading={true} />
            </div>
        </div>
    </div>


}

export default UserDataLoaded;