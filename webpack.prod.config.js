var webpack = require("webpack");

const CleanWebpackPlugin = require('clean-webpack-plugin');

var GLOBALS = {        
    'process.env.NODE_ENV': JSON.stringify('production'),
	"process.env.APP": JSON.stringify(process.env.APP),
	"process.env.baseURL": JSON.stringify(process.env.BACKEND_SERVER)//JSON.stringify("http://10.240.4.247:3334")
};

module.exports = require('./webpack.config.js');

delete module.exports.devtool;

module.exports.plugins.pop();
module.exports.plugins.concat([
    new CleanWebpackPlugin(['public']),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
            warnings: false
        }
    })
]);

module.exports.module.rules.forEach(rule => {
    delete rule.exclude;
    return rule;
});