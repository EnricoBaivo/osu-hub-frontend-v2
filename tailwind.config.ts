import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },

  darkMode: ["class", '[data-mode="dark"]'],
  fontFamily: {
    exo: ["var(--font-exo)", ...fontFamily.sans],
  },
  theme: {
    extend: {
      screens: {
        normal: "900px",
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
      letterSpacing: {
        xwidest: "0.25rem",
      },
      // https://vercel.com/design/color
      colors: {
        gray: colors.zinc,
        "gray-1000": "rgb(17,17,19)",
        "gray-1100": "rgb(10,10,11)",
        vercel: {
          pink: "#FF0080",
          blue: "#0070F3",
          cyan: "#50E3C2",
          orange: "#F5A623",
          violet: "#7928CA",
        },
        osuhub: {
          blue: "#2E2F71",
          green: "#AADD00",
          red: "#EA4D4D",
          gray: "#334155",
          yellow: "#FFCC22",
          dark: {
            ice: { grey: "#0B121D80", blue: "#2E2F7138" },
          },
        },
      },

      backgroundImage: ({ theme }) => ({
        "vc-border-gradient": `radial-gradient(at left top, ${theme(
          "bg-slate-950",
        )}, 50px, ${theme("bg-slate-950")} 50%)`,
        
      }),
      keyframes: ({ theme }) => ({
        rerender: {
          "0%": {
            ["border-color"]: theme("colors.vercel.pink"),
          },
          "40%": {
            ["border-color"]: theme("colors.vercel.pink"),
          },
        },
        highlight: {
          "0%": {
            background: theme("colors.vercel.pink"),
            color: theme("colors.white"),
          },
          "40%": {
            background: theme("colors.vercel.pink"),
            color: theme("colors.white"),
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        translateXReset: {
          "100%": {
            transform: "translateX(0)",
          },
        },
        fadeToTransparent: {
          "0%": {
            opacity: "1",
          },
          "40%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
