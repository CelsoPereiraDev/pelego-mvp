import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-main)']
      },
      colors: {
        customGold: '#9e7e47',
        customLightGold: '#fbdd97',
        'custom-gradient-start': 'rgba(192, 33, 100, 1)',
        'custom-gradient-end': 'rgba(192, 33, 100, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
