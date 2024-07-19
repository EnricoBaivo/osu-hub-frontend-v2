import type { Meta, StoryObj } from "@storybook/react";
import ScoreMods from "./ScoreMods";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "ScoreBanner/ScoreMods",
  component: ScoreMods,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    mods: {
      description: "The mods to display",
      control: {
        type: "array of mod names",
      },
    },
  },
} satisfies Meta<typeof ScoreMods>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mods: ["HardRock", "SuddenDeath", "DoubleTime"],
  },

  parameters: {
    // More on theming: https://storybook.js.org/docs/react/configure/theming
    // More on controls: https://storybook.js.org/docs/react/essentials/controls
    setActive: (val: number) => console.log(val),
    mods: {
      values: [
        { name: "Autoplay", value: "autoplay" },
        { name: "Cinema", value: "cinema" },
        { name: "Doubletime", value: "doubletime" },
        { name: "Easy", value: "easy" },
        { name: "Flashlight", value: "flashlight" },
        { name: "Halftime", value: "halftime" },
        { name: "Hardrock", value: "hardrock" },
        { name: "Hidden", value: "hidden" },
        { name: "Nightcore", value: "nightcore" },
        { name: "Nofail", value: "nofail" },
        { name: "Perfect", value: "perfect" },
        { name: "Relax", value: "relax" },
        { name: "Relax2", value: "relax2" },
        { name: "Scorev2", value: "scorev2" },
        { name: "Spunout", value: "spunout" },
        { name: "strings.py", value: "strings.py" },
        { name: "Suddendeath", value: "suddendeath" },
        { name: "Target", value: "target" },
        // ... add more values if needed
      ],
    },
  },
};
