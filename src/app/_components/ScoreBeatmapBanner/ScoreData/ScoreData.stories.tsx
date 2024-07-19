import type { Meta, StoryObj } from "@storybook/react";
import ScoreData from "./ScoreData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/ScoreData",
  component: ScoreData,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ScoreData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reached_pp: 233,
    accuracy: 96.52,
    reached_combo: 523,
    max_combo: 853,
  },
};
