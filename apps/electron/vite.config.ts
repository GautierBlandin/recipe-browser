import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/electron',

  build: {
    emptyOutDir: true,
    outDir: 'dist',
    reportCompressedSize: true,
    lib: {
      entry: {
        main: resolve(__dirname, 'src/main.ts'),
        preload: resolve(__dirname, 'src/preload.ts')
      },
      formats: ['cjs'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: [
        'electron',
        'path',
        'fs',
        'url',
        'http',
        'https',
        'os',
        'crypto'
      ],
      output: {
        entryFileNames: '[name].js'
      }
    },
    target: 'node22',
    minify: false,
    sourcemap: true
  }
});
