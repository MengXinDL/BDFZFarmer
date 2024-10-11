import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['./src/interact.ts','./src/render.ts','./src/sharedData.ts','./src/main.ts'],
    bundle: true,
    outdir: './dist',
    minify: true,
    sourcemap: true,
    tsconfig: './tsconfig.json',
});