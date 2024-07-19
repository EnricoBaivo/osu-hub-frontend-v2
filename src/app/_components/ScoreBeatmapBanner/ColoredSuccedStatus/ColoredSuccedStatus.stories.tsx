import type { Meta, StoryObj } from "@storybook/react";
import ColoredSuccedStatus from "./ColoredSuccedStatus";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/ColoredSuccedStatus",
  component: ColoredSuccedStatus,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ColoredSuccedStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accuracy: 0.95,
    perfect: false,
    passed: true,
  },
};
