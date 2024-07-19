import type { Meta, StoryObj } from "@storybook/react";
import DifficultyAttributesOverlay from "./DifficultyAttributesOverlay";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/DifficultyAttributesOverlay",
  component: DifficultyAttributesOverlay,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof DifficultyAttributesOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stars: 4.2,
    ar: 12,
    pr: 32,
    od: 32,
    cs: 2,
    hp: 1,
    score: 213321322,
    lengthSeconds: 321,
    n_circles: 321,
    n_sliders: 121,
    bpm: 191,
  },
};
