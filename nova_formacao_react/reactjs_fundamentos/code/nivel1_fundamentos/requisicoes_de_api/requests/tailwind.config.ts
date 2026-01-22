import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // 🔥 OBRIGATÓRIO para shadcn/ui
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
