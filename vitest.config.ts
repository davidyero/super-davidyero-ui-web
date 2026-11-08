import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Vite 8 transforma con Oxc (antes esbuild): JSX de Emotion.
  oxc: { jsx: { runtime: 'automatic', importSource: '@emotion/react' } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.tsx', 'test/**/*.test.ts'],
  },
});
