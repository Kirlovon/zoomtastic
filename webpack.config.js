const path = require('path');

const config = env => {
    const isProduction = env ? env.production : false;

    return {
        target: 'web',
        mode: isProduction ? 'production' : 'development',
        watch: isProduction ? false : true,
        entry: './zoomtastic.js',
        devtool: 'source-map',
        resolve: {
            extensions: ['.js'],
        },
        output: {
            library: 'Zoomtastic',
            libraryTarget: 'umd',
            libraryExport: 'default',
            filename: 'zoomtastic.umd.js',
            sourceMapFilename: 'zoomtastic.umd.js.map',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
    }
};

module.exports = config;