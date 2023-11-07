/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'serif': ['Inter', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
};
