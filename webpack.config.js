var path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
export PORT=8080
export BACKEND_SERVER=http://localhost:8080
export APP=PruebaAbraxas
*/
var GLOBALS = {
	"process.env.APP": JSON.stringify(process.env.APP),
	"process.env.baseURL": JSON.stringify(process.env.BACKEND_SERVER)//JSON.stringify("http://10.240.4.247:3334")
};

module.exports = {
    entry: [
        'react-hot-loader/patch',
        "./index.js"
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
        contentBase: path.resolve(__dirname, 'public/assets'),
        open: true,
        compress: true,
        hot: true,
        historyApiFallback: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(GLOBALS)
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'stage-0', 'react', "stage-2"]
                    }
                }
            }, 
            {
                test: /\.html$/,
                use: ['html-loader']
            }, 
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/',
                    }
                }]
            }, 
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            { 
                test: /\.scss$|\.css$/, 
                exclude: '/(node_modules)/', 
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader", "postcss-loader"],
                    fallback: 'style-loader'
                })            
            }
        ]        
    },
    resolve: {
		alias: {
			Components: path.resolve(__dirname, 'src/components/'),
			Containers: path.resolve(__dirname, 'src/containers/'),
			Modules: path.resolve(__dirname, 'src/modules/'),
			Assets: path.resolve(__dirname, 'src/assets/')
		}
	}
}