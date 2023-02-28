import { Options } from 'tsup';

const config: Options = {
  splitting: true,
  format: ['esm', 'cjs', 'iife'],
  entryPoints: ['src/index.ts'],
  clean: true,
  dts: true,
  outDir: './dist',
};

export default config;
