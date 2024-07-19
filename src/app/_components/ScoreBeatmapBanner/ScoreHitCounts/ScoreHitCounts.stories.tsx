import type { Meta, StoryObj } from "@storybook/react";
import ScoreHitCounts from "./ScoreHitCounts";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/ScoreHitCounts",
  component: ScoreHitCounts,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ScoreHitCounts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count_miss: "1",
    count_geki: "1",
    count_katu: "1",
    n_300: "233",
    n_100: "96.52",
    n_50: "523",
  },
};
