const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
    build: {
        minify: 'terser',
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