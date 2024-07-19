import type { Meta, StoryObj } from "@storybook/react";
import UserGradeCounts from "./UserGradeCounts";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Profile/UserGradeCounts",
  component: UserGradeCounts,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof UserGradeCounts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userGradeCounts: {
      id: 20, ss: 10, ssh: 32, s: 1030, sh: 430, a: 4550
    }
  },
};
