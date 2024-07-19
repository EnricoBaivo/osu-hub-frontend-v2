
import type { Meta, StoryObj } from "@storybook/react";
import BeatmapFailtimesGraph from "./BeatmapFailtimesGraph";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "UI/BeatmapFailtimesGraph",
    component: BeatmapFailtimesGraph,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof BeatmapFailtimesGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: {
            id: 123123,
            fail: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 1, 0, 0, 9, 78,
                462, 145, 304, 330, 2006, 1056, 965, 1030, 1161, 323, 101, 306, 662, 449,
                1311, 1269, 1036, 2559, 2668, 1504, 805, 753, 579, 652, 764, 764, 1206, 541,
                379, 613, 457, 370, 339, 470, 357, 349, 536, 510, 422, 751, 720, 527, 346,
                354, 294, 623, 907, 626, 440, 444, 219, 152, 138, 110, 86, 134, 134, 91, 66,
                69, 88, 142, 120, 124, 83, 49, 133, 91, 105, 117, 101, 78, 107, 228, 791,
            ],
            exit: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 15, 12, 5, 4, 7, 10, 5, 14,
                99, 14, 139, 86, 589, 130, 168, 115, 31, 2, 58, 100, 97, 93, 320, 129, 175,
                522, 524, 123, 175, 226, 265, 276, 272, 396, 264, 180, 181, 391, 153, 147,
                249, 292, 291, 370, 463, 681, 127, 385, 304, 209, 351, 225, 280, 313, 444,
                311, 409, 495, 161, 46, 80, 106, 101, 66, 78, 15, 36, 81, 153, 159, 121, 120,
                119, 102, 214, 233, 167, 171, 116, 140, 64, 71, 77, 83,
            ]
        }
    },
    decorators: [
        (Story) => (
            <div className="w-full h-screen flex flex-col space-y-4">

                <Story />
            </div>
        ),
    ],
};
