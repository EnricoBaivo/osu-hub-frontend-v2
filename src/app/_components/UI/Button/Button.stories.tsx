
import type { Meta, StoryObj } from "@storybook/react";
import TestButtonNodge from "./TestButtonNodge";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "UI/ButtonNodge",
    component: TestButtonNodge,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof TestButtonNodge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "This is the default InfoNodge",
    },
    decorators: [
        (Story) => (
            <div className="flex flex-col space-y-4">

                <Story />
            </div>
        ),
    ],
};
