import { Inter, Lora, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

// define your variable fonts
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });
// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ weight: "400", subsets: ["latin"] });
const sourceCodePro700 = Source_Sans_3({ weight: "700", subsets: ["latin"] });
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder

const exo2 = localFont({
  variable: "--font-exo",
  src: [
    {
      path: "../../public/Typeface/Exo2/Exo2.0-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-ExtraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/Typeface/Exo2/Exo2.0-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
  ],
});

export { inter, lora, sourceCodePro400, sourceCodePro700, exo2 };
