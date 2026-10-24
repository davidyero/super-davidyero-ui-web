import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: { jsx: 'automatic', jsxImportSource: '@emotion/react' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.tsx', 'test/**/*.test.ts'],
  },
});
