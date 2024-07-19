
"use client"
import { useAudio } from "@/hooks/useAudio";
import Link from "next/link";
import { PiGameControllerDuotone } from "react-icons/pi";
export type GoToBeatmapButtonType = {
    beatmapId: number | undefined;
};

const JumpToOsuDirect = ({ beatmapId }: GoToBeatmapButtonType) => {
    const { setCurrentlyPlayingState } = useAudio()
    return <Link
        onClick={() => setCurrentlyPlayingState(false)}
        href={"osu://b/" + beatmapId}
        title="Jump to osu!direct"
        role="button"
        className="hover:text-yellow-500 flex"
    >
        <PiGameControllerDuotone className="text-2xl" /> <span className={"lowercase"}>osu!</span>direct
    </Link>

}
export default JumpToOsuDirect;