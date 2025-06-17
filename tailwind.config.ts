import type { Config } from 'tailwindcss/types/config';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
