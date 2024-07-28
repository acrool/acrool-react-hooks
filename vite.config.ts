import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {visualizer} from 'rollup-plugin-visualizer';

import dts from 'vite-plugin-dts';
import glob from 'fast-glob';
import eslint from 'vite-plugin-eslint';

// libraries
const files = glob.sync(['./src/**/index.ts'])
    .map(file => {
        const key = file.match(/(?<=\.\/src\/).*(?=\.ts)/);
        return [key[0], file];
    });
const entries = Object.fromEntries(files);


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        eslint(),
        react(),
        dts({
            insertTypesEntry: true,
        }),
        visualizer() as Plugin,
    ],
    build: {
        minify: process.env.NODE_ENV === 'production',
        sourcemap: process.env.NODE_ENV !== 'production',
        outDir: 'dist',
        lib: {
            entry: entries,
            formats: ['es', 'cjs'],
            fileName: (format,entryName) => `${entryName}.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});


