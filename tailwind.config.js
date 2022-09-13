// when edit them, have to edit in both this file and tailwind.config.js

const primaryColor = "#FDAE5B";
const primaryHoveredColor = "#FEBA72";
const green = "#57B65F";
const blue = "#4E97F3";

// white grey and black
const grey0 = "#FFFFFF";
const grey50 = "#F5F0F0";
const grey100 = "#E0E0E0";
const grey300 = "#8F8F8F";
const grey500 = "#666666";
const grey700 = "#3D3D3D";
const grey850 = "#1F1F1F";
const grey900 = "#121212";

// main
const bgColor = grey0;
const primaryTextColor = grey900;

// font family
const sansFamily = ["Arial", "sans-serif"];
const serifFamily = ["Arial", "sans-serif"];
const monoFamily = ["Montserrat", "Arial", "sans-serif"];

// font size
const fontSizeXS = "8px";
const fontSizeSM = "10px";
const fontSizeMD = "12px";
const fontSizeLG = "16px";
const fontSizeXL = "20px";
const fontSize2XL = "24px";
const fontSize3XL = "32px";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: sansFamily,
        serif: serifFamily,
        mono: monoFamily,
      },
      fontSize: {
        xs: fontSizeXS,
        sm: fontSizeSM,
        md: fontSizeMD,
        lg: fontSizeLG,
        xl: fontSizeXL,
        "2xl": fontSize2XL,
        "3xl": fontSize3XL,
      },
      colors: {
        grey: {
          "text-primary": primaryTextColor, // text-text-primary
          "bg-color": bgColor, // text-bg-color
          0: grey0, // text-grey-0
          50: grey50,
          100: grey100,
          300: grey300,
          500: grey500,
          700: grey700,
          850: grey850,
          900: grey900,
        },
        primary: primaryColor,
        "primary-hovered": primaryHoveredColor,

        green: green,
        blue: blue,
      },
    },
  },
  plugins: [],
};
