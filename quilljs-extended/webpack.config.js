var webpack = require('webpack'),
    path = require('path'),
    extend = require('extend'),

    ExtractTextPlugin = require("extract-text-webpack-plugin"),

    uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


const config = {

    entry: {
        'quilljs.extended': [
            'babel-polyfill',
            path.resolve(__dirname, 'src/js/quilljs.extended.js')
        ]
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: '[name].js'
    },

    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel?presets[]=es2015&presets[]=react'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }]
    }
}

const deployConfig = extend(true, {}, config, {

    plugins: [
        new uglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }
        }),

        new ExtractTextPlugin("css/[name].css")
    ]
});


module.exports = deployConfig;
