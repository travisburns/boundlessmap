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
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          600: '#7c4a3a',
          800: '#5c3d2e',
          900: '#3b2c25',
        },
      },
      fontFamily: {
        medieval: ['MedievalSharp', 'cursive'], // Replace 'MedievalSharp' with your chosen font if different
      },
      backgroundColor: {
        'parchment': '#f2e8e5',
      },
    },
  },
  plugins: [],
};

export default config;