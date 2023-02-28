import { Options } from 'tsup';
import alias from 'esbuild-plugin-alias';

const paths = import.meta.url.replace(/\/[^/]+$/, '/node_modules/unfetch/dist/unfetch.mjs').replace('file://', '');

const config: Options = {
  splitting: true,
  format: ['esm', 'cjs', 'iife'],
  entryPoints: ['src/index.ts'],
  clean: true,
  dts: true,
  outDir: './dist',
  esbuildPlugins: [
    alias({
      unfetch: paths,
    }),
  ],
};

export default config;
