import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--primary-50)",
        },
        blue: {
          50: "var(--blue-50)",
          500: "var(--blue-500)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        "bold-34": ["34px", { lineHeight: "140%", fontWeight: 700 }],
        "semibold-16": ["16px", { lineHeight: "140%", fontWeight: 500 }],
        "regular-12": ["12px", { lineHeight: "140%", fontWeight: 400 }],
      },
    },
  },
  plugins: [],
};
export default config;
