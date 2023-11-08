/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
import resolveConfig from "tailwindcss/resolveConfig";

export default  resolveConfig({
  darkMode: ['class', 'data-mode=dark'],
  content: ["./src/**/*.{html,js,ts,jsx,tsx,css}"],
  theme: {
    ...defaultTheme,
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Inter", ...defaultTheme.fontFamily.sans],  
        sans_condensed: ["Barlow Condensed", ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [
    function ({ addVariant }: any) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
});
