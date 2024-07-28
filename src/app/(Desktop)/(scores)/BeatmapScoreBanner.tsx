
import React from "react";
import { api } from "@/trpc/server";

import { Mods, modsToStringList } from "@/lib/Mod";
import InfoNodge from "@/app/_components/UI/InfoNodge/InfoNodge";

import Link from "next/link";
import { RiDownload2Line, RiVideoDownloadLine } from "react-icons/ri";
import JumpToOsuDirect from "@/app/_components/UI/Button/JumpToOsuDirect";
import ScoreBeatmapBanner from "@/app/_components/ScoreBeatmapBanner/ScoreBeatmapBanner";


async function BeatmapScoreBanner({
  showDetails = false,
  score_id,
}: {
  showDetails?: boolean;
  score_id: number;


}) {
  const score = await api.score.byId.query({ score_id: score_id });

  if (!score?.beatmap_id) return <div>Score not found</div>;
  const beatmap = await api.beatmap.byId.query({ beatmapId: Number(score.beatmap_id) })
  const prediction = await api.prediction.byIdWithMods.query({ beatmapId: Number(score.beatmap_id), mods: score.mods ?? 0 });
  const hasAniList = await api.beatmapset.hasAniList.query({ beatmapset_id: Number(score.beatmapset_id) })

  if (!beatmap) return <div>beatmap not found</div>;
  if (!score) return <div>Score not found</div>;

  const modNames = new Mods(score.mods)

  const filtered = modsToStringList(modNames)
  const predictions = prediction[0]?.mods_prediction[0]?.acc_prediction
  const b_acc = predictions?.map((pre) => { return pre.acc?.toFixed(2).toString() ?? "??" })
  const b_pp = predictions?.map((pre) => { return pre.pp?.toFixed(2).toString() ?? "??" })


  return score && <ScoreBeatmapBanner
    score_type={score?.type ?? "osu"}
    score_id={Number(score?.id ?? 0)}
    beatmapMetaData={{

      hasAniList: hasAniList,
      beatmap_id: Number(score.beatmap_id ?? 0),
      beatmapset_id: Number(score.beatmapset_id ?? 0),
      artist: beatmap?.beatmapset?.artist ?? "missing",
      title: beatmap?.beatmapset?.title ?? "missing",
      covers: beatmap?.beatmapset?.covers,
      version: beatmap?.version ?? "missing",
      creator: beatmap?.beatmapset?.creator ?? "missing",
      cover: beatmap?.beatmapset?.covers?.list ?? "/defaultBeatmapBanner.png",
      preview_url: beatmap?.beatmapset?.preview_url ?? "missing",
      author: beatmap?.beatmapset?.artist ?? "missing",
      url: beatmap?.url ?? "missing",
    }}
    beatmapset_video={beatmap?.beatmapset?.video ?? false}
    preview_url={beatmap?.beatmapset?.preview_url}
    showDetails={showDetails}
    reached_rank={score?.rank ?? "ss"}
    infoNodges={{
      isInView: true,
      children: <>
        <InfoNodge>{beatmap?.status ?? "missing"}</InfoNodge>
        <InfoNodge>
          <Link
            href={
              "https://osu.ppy.sh/beatmapsets/" + beatmap?.beatmapset_id + "#osu/" + beatmap?.id
            }
            target="_blank"
            title={beatmap?.beatmapset?.video ? "Download with video" : "Download without video"}
            role="button"
            className="flex items-center justify-center hover:text-yellow-500 gap-2"
          >
            {beatmap?.beatmapset?.video ? <RiVideoDownloadLine className=" text-2xl" /> : <RiDownload2Line className=" text-2xl" />}
            Download

          </Link>
        </InfoNodge>
        <InfoNodge>
          <JumpToOsuDirect beatmapId={beatmap?.id} />
        </InfoNodge>
      </>


    }}
    beatmapCoverCard={beatmap?.beatmapset?.covers?.["cover@2x"] ?? "/defaultBeatmapBanner.png"}


    DifficultyAttributesOverlay={{
      ar: prediction[0]?.mods_prediction[0]?.ar ?? 0,
      od: prediction[0]?.mods_prediction[0]?.od ?? 0,
      stars: prediction[0]?.mods_prediction[0]?.stars ?? 0,
      pr: prediction[0]?.mods_prediction[0]?.aim ?? 0,
      cs: prediction[0]?.mods_prediction[0]?.cs ?? 0,
      hp: prediction[0]?.mods_prediction[0]?.hp ?? 0,
      lengthSeconds: Number(beatmap?.total_length ?? 0),
      bpm: beatmap?.bpm ?? 0,
      n_circles: beatmap?.count_circles ?? 0,
      n_sliders: beatmap?.count_sliders ?? 0,
      score: 9.5,
    }}

    scoreBeatmapBannerSuccedStatusData={{
      accuracy: score.accuracy ?? 0,
      perfect: score.perfect ?? false,
      passed: score.passed ?? false,
    }}
    scoreBeatmapFooterData={{
      score_type: score?.type ?? "osu",
      score_id: Number(score.id ?? 0),
      date: score.created_at,
      scoreData: {
        reached_pp: Number(score.pp?.toPrecision(3) ?? 0),
        accuracy: score.accuracy ?? 0,
        reached_combo: score.max_combo ?? 0,
        max_combo: beatmap?.max_combo ?? 0,
      },

      scoreHitData: {
        count_miss: score?.score_statistic?.count_miss?.toString() ?? "missing",
        count_geki: score?.score_statistic?.count_geki?.toString() ?? "missing",
        count_katu: score?.score_statistic?.count_katu?.toString() ?? "missing",
        n_300: score?.score_statistic?.count_300?.toString() ?? "missing",
        n_100: score?.score_statistic?.count_100?.toString() ?? "missing",
        n_50: score?.score_statistic?.count_50?.toString() ?? "missing",
      },
      scoreModsData: {
        mods: filtered ?? ["missing"],
      },

      scorePredictionData: {
        accuracy: b_acc ?? ["100%", "99%", "98%", "97%", "95%", "90%"],
        pp: b_pp ?? ["??", "??", "??", "??", "??", "??"],
      },
    }}

  />
}
export default BeatmapScoreBanner;
