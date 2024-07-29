import Image from "next/image";
import Link from "next/link";
import AnimieTrailer from "./AnimieTrailer";
import { SiAnilist } from "react-icons/si";
import { api } from "@/trpc/server";
interface Props {
    beatmapset_id: number;
}
const AnimeDetail = async ({ beatmapset_id }: Props) => {
    const aniListMedia = await api.beatmapset.getAniListMedia.query({
        beatmapset_id: Number(beatmapset_id)
    })
    if (!aniListMedia) {
        return <div>Media not found</div>
    }
    const media = aniListMedia.data.Media;

    return (<>
        <div className="relative flex flex-col container w-4/6 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-black/60 backdrop-blur-lg border border-osuhub-gray" >
            <div className="absolute h-[336px] w-full flex flex-col justify-between">
                <Image unoptimized quality={100} className="absolute z-10 rounded-3xl " src={media.coverImage.extraLarge} alt={media.title.userPreferred} layout="fill" objectFit="cover" />
                <div className="w-full h-16 flex p-6 justify-end z-20">
                    <SiAnilist className="text-3xl text-osuhub-yellow" />
                </div>
                <div className="flex flex-wrap gap-2 p-6 text-white z-20 ">
                    {media.genres.map((genre) => (
                        <span key={genre} className="font-semibold bg-osuhub-dark-ice-blue backdrop-blur-xl px-3 py-1 rounded-full text-sm border border-osuhub-gray ">{genre}</span>
                    ))}
                </div>
            </div>
            <Link href={media.siteUrl} target="_blank" className="pl-6 pr-6 pb-6 mt-96 text-white flex flex-col gap-2  z-30  justify-end">
                <h1 className="text-3xl font-bold text-osuhub-yellow">{media.title.userPreferred}</h1>
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: media.description }}
                />
                <div className="flex flex-col gap-2">
                    <span className="block text-sm font-medium">Episodes: {media.episodes}</span>
                    <span className="block text-sm font-medium">Status: {media.status}</span>
                    <h2 className="text-xl font-semibold ">Beatmapsets</h2>
                    <div className="flex flex-wrap gap-2">
                        {aniListMedia.beatmapsets?.map((beatmapset) => (
                            <div key={beatmapset.id} className="flex gap-1 bg-gray-700 px-3 py-1 rounded-full text-sm">
                                <span>{Number(beatmapset.id)}</span>
                                <span>{beatmapset.title}</span>
                                <span>{beatmapset.creator}</span>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold">Rating</h2>
                    <div className="flex flex-wrap gap-1">
                        {media.rankings.map((ranking) => (
                            !ranking.season && <div key={ranking.rank + ranking.type} className="flex gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm">
                                <span>{ranking.context}</span>
                                <span>#{ranking.rank}</span>
                                <span>{ranking.year}</span>
                            </div>

                        ))}
                    </div>
                </div>
            </Link>
        </div>

        {
            media.trailer &&
            <div className="flex relative w-4/6 h-[720px] bg-slate-950 rounded-3xl overflow-hidden">
                <AnimieTrailer id={media.trailer.id} thumbnail={media.trailer.thumbnail} />
            </div>
        }


        <div className="md:w-2/3 w-full ">
            <h2 className="text-3xl font-semibold mb-4 text-white">Recommendations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {media.recommendations.edges.map((edge) => (
                    <div
                        key={edge.node.mediaRecommendation.title.userPreferred}
                        className="bg-osuhub-dark-ice-blue/20 backdrop-blur-sm rounded-lg border border-osuhub-gray overflow-hidden md:h-72 md:w-56 relative"
                    >
                        <div className="flex relative w-full h-full items-center justify-center">

                            <Image
                                unoptimized
                                src={edge.node.mediaRecommendation.coverImage.large}
                                alt={edge.node.mediaRecommendation.title.userPreferred}
                                fill
                                className="rounded-md"
                            />


                            <Link
                                href={edge.node.mediaRecommendation.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-full p-2 z-50 w-full absolute bg-black/30 bottom-0"
                            >
                                <h3 className="text-xl font-semibold  text-osuhub-yellow ">
                                    {edge.node.mediaRecommendation.title.userPreferred}
                                </h3>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
};

export default AnimeDetail;