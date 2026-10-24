import { readdirSync } from 'node:fs';
import { defineConfig } from 'tsup';

// Una entrada por componente (`@davidyero/ui-web/SuperButton`) más las de
// tema, loader y toast. Sin barrels: cada subruta importa solo lo suyo.
const components = Object.fromEntries(
  readdirSync('src/components').map((name) => [name, `src/components/${name}/${name}.tsx`]),
);

export default defineConfig({
  entry: {
    ...components,
    theme: 'src/theme/SuperThemeProvider.tsx',
    tokens: 'src/theme/tokens.ts',
    loader: 'src/stores/loaderStore.ts',
    toast: 'src/stores/toastStore.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  sourcemap: false,
  target: 'es2022',
  external: ['react', 'react-dom', '@emotion/react', '@emotion/styled', '@iconify/react'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
    options.jsxImportSource = '@emotion/react';
  },
});
