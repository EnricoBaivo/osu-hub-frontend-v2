import type { Meta, StoryObj } from "@storybook/react";
import ScoreBannerHeaderWithPlay from "./ScoreBannerHeaderWithPlay";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/ScoreBannerHeaderWithPlay",
  component: ScoreBannerHeaderWithPlay,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ScoreBannerHeaderWithPlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cover: "https://assets.ppy.sh/beatmaps/1234567/covers/cover.jpg",
    author: "yoasobi",
    title: "Yoru ni Kakeru",
    version: "Nightcore Mix",
    creator: "Nodge",
    preview_url: "https://b.ppy.sh/preview/123456.mp3",
  },
};
