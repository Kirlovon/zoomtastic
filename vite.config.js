import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        minify: 'esbuild',
        target: 'es2015',
        sourcemap: true,
        emptyOutDir: false,
        reportCompressedSize: true,
        lib: {
            name: 'Zoomtastic',
            entry: path.resolve(__dirname, 'zoomtastic.js'),
            fileName: (format) => `zoomtastic.${format}.js`
        },
        rollupOptions: {
            output: {
                globals: {
                    zoomtastic: 'Zoomtastic'
                }
            }
        }
    }
});