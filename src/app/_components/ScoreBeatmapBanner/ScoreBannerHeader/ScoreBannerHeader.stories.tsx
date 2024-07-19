import type { Meta, StoryObj } from "@storybook/react";
import ScoreBannerHeader from "./ScoreBannerHeader";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/ScoreBannerHeader",
  component: ScoreBannerHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ScoreBannerHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: "yoasobi",
    title: "Yoru ni Kakeru",
    version: "Nightcore Mix",
    creator: "Nodge",
  },
};
