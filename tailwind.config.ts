import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      grayblack: '#OBOC10',
      gray: '#C5C6C7',
      turquoise: '#66FCF1',
      teal: '#45A29E',
      white: '#FFFFFF',
      black: '#000000',
    }
  },
  plugins: [],
};
export default config;
