import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  base: '/ui-showcase/',
  plugins: [react()],
  test: {
    projects: [
      {
        name: 'unit',
        test: {
          include: ['src/**/*.{test,spec}.{js,ts,jsx}'],
          exclude: ['**/*.browser.test.{js,ts,jsx,tsx}'],
          environment: 'jsdom',
          globals: true,
        },
      },
      {
        name: 'browser',
        test: {
          include: ['src/**/*.browser.test.{js,ts,jsx,tsx}'],
          globals: true,
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'firefox' }],
            headless: true,
          },
        },
      },
    ],
  },
});
