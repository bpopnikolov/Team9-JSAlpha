var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        "app.bundle" : "./app.js",
        "app.bundle.min" : "./app.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
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
