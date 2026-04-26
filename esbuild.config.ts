import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node24',
  format: 'esm',
  resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  sourcemap: true,
  packages: 'external',
  outdir: 'dist',
});

console.log('[esbuild] Built Tourh Shphere API successfully!');
