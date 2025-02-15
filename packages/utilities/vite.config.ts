import {defineConfig} from 'vitest/config';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        isRecord: 'src/isRecord.ts',
      },
    },
    rollupOptions: {
      external: [/@micra\/*/],
    },
  },

  plugins: [dts({exclude: ['**/tests/**', 'dist/**', '**/*.test.ts', '**/*.test.tsx']})],

  test: {
    name: pkg.name,
    coverage: {
      include: ['src/**/*.ts'],
      reporter: 'json-summary',
      exclude: ['node_modules', 'tests', '**/*.test.ts', 'src/*.ts'],
      reportsDirectory: '.config/coverage',
    },
  },
});
