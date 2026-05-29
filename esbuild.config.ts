import * as esbuild from 'esbuild';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

const watch = process.argv.includes('--watch');

const ctx = await esbuild.context({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node24',
  format: 'esm',
  outdir: 'dist',
  sourcemap: true,
  packages: 'external',
  plugins: [esbuildPluginTsc()],
});

if (watch) {
  await ctx.watch();
  console.log('[esbuild] watching...');
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
