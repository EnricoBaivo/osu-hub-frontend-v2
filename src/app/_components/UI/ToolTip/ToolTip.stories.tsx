import type { Meta, StoryObj } from "@storybook/react";
import ToolTip from "./ToolTip";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "UI/ToolTip",
    component: ToolTip,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof ToolTip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [
        (Story) => (
            <div className="flex dark:bg-slate-900 w-screen h-screen">
                <Story />
            </div>
        ),
    ],
    args: {
        title: "Title",
        description: "Description",
        children: <div className=" rounded-full bg-slate-700 text-white w-fit p-4">Children</div>
    },
};
