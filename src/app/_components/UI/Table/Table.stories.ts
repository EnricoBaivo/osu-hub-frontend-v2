import type { Meta, StoryObj } from "@storybook/react";
import { VerticalTable } from "./Table";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "UI/VerticalTable",
  component: VerticalTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof VerticalTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataset: [
      {
        header: "Accurracy",
        data: ["100%", "99%", "98%", "97%", "95%", "90%"],
      },
      {
        header: "PP",
        data: ["231", "198", "123", "100", "98", "45"],
      },
    ],
    caption: "This is a caption",
  },
};
