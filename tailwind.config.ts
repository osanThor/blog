import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        imperialScript: ["var(--font-imperialScript)"],
      },
    },
  },
  plugins: [require("tailwindcss-content-visibility")],
  darkMode: "selector",
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
