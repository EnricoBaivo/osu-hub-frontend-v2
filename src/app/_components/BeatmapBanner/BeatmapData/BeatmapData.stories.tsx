import type { Meta, StoryObj } from "@storybook/react";
import BeatmapData from "./BeatmapData";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "BeatmapBanner/BeatmapData",
  component: BeatmapData,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof BeatmapData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    max_combo: 853,
  },
};
