"use client"
import type { inferRouterOutputs } from '@trpc/server';
import BeatmapBanner from "../../_components/BeatmapBanner/BeatmapBanner";
import { Mods, modsToStringList } from '@/lib/Mod';
import { SkeletonCard } from '../../_components/UI/SkeltonCard';
import { api } from '@/trpc/react';
import type { PredictionRouter } from '@/server/api/routers/prediction';
import InfoNodge from '../../_components/UI/InfoNodge/InfoNodge';
import Link from 'next/link';
import { RiDownload2Line, RiVideoDownloadLine } from 'react-icons/ri';
import JumpToOsuDirect from '../../_components/UI/Button/JumpToOsuDirect';
import { useEffect } from 'react';
type RouterOutput = inferRouterOutputs<PredictionRouter>;
type getByIdOutput = RouterOutput['recommendation'];
type getByIdResult = getByIdOutput['res'];
type getBeatmapById = getByIdResult[0];


const BeatmapBannerRecommendation = ({ beatmapRec }: { beatmapRec: getBeatmapById }) => {
    if (!beatmapRec ?? !beatmapRec.beatmap_id ?? !beatmapRec.beatmapset_id) return <SkeletonCard />

    const prediction = beatmapRec
    // const prediction = api.prediction.byId.useQuery({ predictionId: Number(beatmapRec.id) })
    const beatmap = api.beatmap.byId.useQuery({ beatmapId: Number(beatmapRec.beatmap_id) }, { refetchOnWindowFocus: false })
    const hasAniList = api.beatmapset.hasAniList.useQuery({ beatmapset_id: Number(beatmapRec.beatmapset_id) })

    if (!beatmap.isSuccess) return <SkeletonCard />

    const [beatmap_predictions] = prediction.mods_prediction
    const b_acc = beatmap_predictions?.acc_prediction.map((pre) => { return pre.acc?.toFixed(2).toString() ?? "??" })
    const b_pp = beatmap_predictions?.acc_prediction.map((pre) => { return pre.pp?.toFixed(2).toString() ?? "??" })
    const modsList = new Mods(beatmap_predictions?.mods ?? 0)

    return beatmap.isSuccess ? <BeatmapBanner key={(beatmap_predictions?.id ?? 0)}
        DifficultyAttributesOverlay={
            {
                ar: beatmap_predictions?.ar ?? 0,
                od: beatmap_predictions?.od ?? 0,
                stars: beatmap_predictions?.stars ?? 0,
                pr: beatmap_predictions?.aim ?? 0,
                cs: beatmap_predictions?.cs ?? 0,
                hp: beatmap_predictions?.hp ?? 0,
                lengthSeconds: Number(beatmap.data?.total_length ?? 0),
                bpm: beatmap_predictions?.bpm ?? 0,
                n_circles: beatmap.data?.count_circles ?? 0,
                n_sliders: beatmap.data?.count_sliders ?? 0,
                score: 9.5,
            }
        }
        //             max_combo: beatmap.data?.max_combo ?? 0,    
        // max_pp: beatmap_predictions?.pp ?? 0,
        infoNodges={
            {
                children: <>
                    <InfoNodge>
                        <span>MAX COMBO {beatmap.data?.max_combo} </span>
                    </InfoNodge>
                    <InfoNodge>
                        <Link
                            href={
                                "https://osu.ppy.sh/beatmapsets/" + beatmap?.data?.beatmapset_id + "#osu/" + beatmap?.data?.id
                            }
                            target="_blank"
                            title={beatmap?.data?.beatmapset?.video ? "Download with video" : "Download without video"}
                            role="button"
                            className="flex items-center justify-center hover:text-yellow-500 gap-2"
                        >
                            {beatmap?.data?.beatmapset?.video ? <RiVideoDownloadLine className=" text-2xl" /> : <RiDownload2Line className=" text-2xl" />}
                            Download

                        </Link>
                    </InfoNodge>
                    <InfoNodge>
                        <JumpToOsuDirect beatmapId={beatmap?.data?.id} />
                    </InfoNodge>
                </>
            }

        }
        beatmapCoverCard={beatmap.data?.beatmapset.covers?.['card@2x'] ?? "/defaultBeatmapBanner.png"}
        beatmapMetaData={
            {
                hasAniList: hasAniList.data ? hasAniList.data : false,
                author: beatmap.data?.beatmapset.creator ?? "missing",
                creator: beatmap.data?.beatmapset.creator ?? "missing",
                version: beatmap.data?.version ?? "missing",
                covers: beatmap.data?.beatmapset.covers ?? {
                    card: "/defaultBeatmapBanner.png", list: "/defaultBeatmapBanner.png", cover: "/defaultBeatmapBanner.png", "slimcover": "/defaultBeatmapBanner.png", "list@2x": "/defaultBeatmapBanner.png", "cover@2x": "/defaultBeatmapBanner.png", "slimcover@2x": "/defaultBeatmapBanner.png",
                    "card@2x": "/defaultBeatmapBanner.png"
                },
                preview_url: beatmap.data?.beatmapset.preview_url ?? "",

                beatmap_id: Number(beatmap.data?.id ?? 0),
                beatmapset_id: Number(beatmap.data?.beatmapset.id ?? 0),
                artist: beatmap.data?.beatmapset.artist ?? "missing",
                title: beatmap.data?.beatmapset.title ?? "missing",
                cover: beatmap.data?.beatmapset.covers?.['list@2x'] ?? "/defaultBeatmapBanner.png",
                url: beatmap.data?.url ?? "missing",
            }
        }
        beatmapset_video={beatmap.data?.beatmapset?.video}
        preview_url={beatmap.data?.beatmapset.preview_url}

        beatmapFooterData={{
            addedDate: prediction.last_update ?? new Date(),
            max_combo: beatmap.data?.max_combo ?? 0,
            modsData: {
                mods: modsToStringList(modsList),
            },
            beatmapFailtimes: beatmap.data?.failtimes ?? {
                fail: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 1, 0, 0, 9, 78,
                    462, 145, 304, 330, 2006, 1056, 965, 1030, 1161, 323, 101, 306, 662, 449,
                    1311, 1269, 1036, 2559, 2668, 1504, 805, 753, 579, 652, 764, 764, 1206, 541,
                    379, 613, 457, 370, 339, 470, 357, 349, 536, 510, 422, 751, 720, 527, 346,
                    354, 294, 623, 907, 626, 440, 444, 219, 152, 138, 110, 86, 134, 134, 91, 66,
                    69, 88, 142, 120, 124, 83, 49, 133, 91, 105, 117, 101, 78, 107, 228, 791,
                ],
                exit: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 15, 12, 5, 4, 7, 10, 5, 14,
                    99, 14, 139, 86, 589, 130, 168, 115, 31, 2, 58, 100, 97, 93, 320, 129, 175,
                    522, 524, 123, 175, 226, 265, 276, 272, 396, 264, 180, 181, 391, 153, 147,
                    249, 292, 291, 370, 463, 681, 127, 385, 304, 209, 351, 225, 280, 313, 444,
                    311, 409, 495, 161, 46, 80, 106, 101, 66, 78, 15, 36, 81, 153, 159, 121, 120,
                    119, 102, 214, 233, 167, 171, 116, 140, 64, 71, 77, 83,
                ]
            },
            predictionData: {
                accuracy: b_acc ?? ["100%", "99%", "98%", "97%", "95%", "90%"],
                pp: b_pp ?? ["??", "??", "??", "??", "??", "??"],
            },
        }
        }
        showDetails={false}
    /> : <SkeletonCard />
}
export default BeatmapBannerRecommendation