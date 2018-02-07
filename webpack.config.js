var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./app.js'],
    output: {
        path: path.resolve(__dirname),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['babel-preset-es2015'].map(require.resolve)
            }
        }]
    },
    stats: {
        colors: true
    },
    watch: true,
    watchOptions: {
        ignored: ['/node_modules', '/bower_components'],
        poll: true
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
    }
}
