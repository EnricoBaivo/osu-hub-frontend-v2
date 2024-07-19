import type { Meta, StoryObj } from "@storybook/react";
import ScoreBeatmapBanner from "./ScoreBeatmapBanner";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/ScoreBeatmapBanner",
  component: ScoreBeatmapBanner,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ScoreBeatmapBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    score_type: "osu",
    beatmap_id: 123,
    beatmapset_id: 123,
    beatmapset_video: true,
    preview_url: "https://b.ppy.sh/preview/123.mp3",
    score_id: 1241242142,
    showDetails: false,
    reached_rank: "SS",
    infoNodges: {
      data: ["ranked", "rock", "english"],
    },
    beatmapCoverCard: "/wowo.jpg",
    DifficultyAttributesOverlay: {
      ar: 9.5,
      pr: 9.5,
      od: 9.5,
      cs: 9.5,
      hp: 9.5,
      score: 9.5,
      lengthSeconds:321,
      bpm: 9.5,
      n_circles: 9.5,
      n_sliders: 9.5,
      stars: 9.5,
    },
    scoreBannerHeader: {
      author: "yoasobi",
      title: "Yoru ni Kakeru",
      version: "Nightcore Mix",
      creator: "Nodge",
    },
    scoreBeatmapBannerSuccedStatusData: {
      accuracy: 99.5,
      perfect: true,
      passed: true,
    },
    scoreBeatmapFooterData: {
      score_type: "osu_bests",
      score_id: 1241242142,
      scoreData: {
        reached_pp: 233,
        accuracy: 96.52,
        reached_combo: 523,
        max_combo: 853,
      },
      scoreHitData: {
        count_miss: "1",
        count_geki: "1",
        count_katu: "1",

        n_300: "233",
        n_100: "96.52",
        n_50: "523",
      },
      scoreModsData: {
        mods: ["suddendeath", "Hidden", "Hardrock", "Doubletime"],
      },
      scorePredictionData: {
        accuracy: ["100%", "99%", "98%", "97%", "95%", "90%"],
        pp: ["231", "198", "123", "100", "98", "45"],
      },
    },
  },
};
