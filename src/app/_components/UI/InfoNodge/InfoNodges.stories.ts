import type { Meta, StoryObj } from "@storybook/react";

import InfoNodges from "./InfoNodges";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/InfoNodges",
  component: InfoNodges,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof InfoNodges>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data:["ranked", "rock", "english"],
  },
};
