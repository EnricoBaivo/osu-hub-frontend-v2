import type { Preview } from "@storybook/react";
import { exo2 } from "../src/styles/fonts";
import * as React from "react";
import "../src/styles/globals.css";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'twitter',
      values: [
        {
          name: 'osuhub',
          value: '#2E2F71',
        }, {
          name: 'white',
          value: 'white',
        }, {
          name: 'twitter',
          value: '#00aced',
        },
        {
          name: 'facebook',
          value: '#3b5998',
        },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className={`${exo2.variable} bg-white dark:bg-slate-800 h-full `}>
        <Story />
      </div>
    ),
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-mode",
    }),
  ],
};

export default preview;
