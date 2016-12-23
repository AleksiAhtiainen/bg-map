var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    url: {
        dataUrlLimit: 1024 // 1kb
    },
    module: {
        loaders: [
            // {
            //      test: /\.svg/,
            //      loader: 'svg-path-loader'
            // },
            {
                test: /\.jsx?/,
                loader: 'babel',
                include: APP_DIR
            }
        ]
    }
    ,
    resolveLoader: {
        fallback: [
        path.resolve(__dirname, 'src/loaders'),
        path.join(process.cwd(), 'node_modules')]
    }
};

module.exports = config;
