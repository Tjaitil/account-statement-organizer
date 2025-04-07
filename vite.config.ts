/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['./tests', 'node_modules/**'],
  },
  base: '/account-statement-organizer/',
  plugins: [vue()],
});
