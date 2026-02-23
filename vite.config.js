import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ui-showcase/',
  plugins: [react()],
  test: {
    projects: [
      {
        name: 'unit-tests',
        test: {
          include: ['src/**/*.{test,spec}.js', 'src/**/*.{test,spec}.ts'],
          globals: true,
          environment: 'node',
        },
      },
    ],
  },
});
