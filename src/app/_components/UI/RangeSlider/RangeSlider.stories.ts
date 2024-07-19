import type { Meta, StoryObj } from "@storybook/react";

import RangeSlider from "./RangeSlider";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/RangeSlider",
  component: RangeSlider,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-1/2",
    default: [75, 101],
    range: [0, 1000],
    step: 1,
    minStepsBetweenThumbs: 0.12,
    callback: (values: number[]) => console.log(values),
  },
};
