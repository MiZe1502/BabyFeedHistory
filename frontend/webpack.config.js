const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`dev: ${dev}`)
console.log(`prod: ${prod}`)

const outputDir = path.resolve(__dirname, 'dist');

const apiUrl = prod ?
        'https://baby-feed-history-be.herokuapp.com/graphql' :
        'http://localhost:3000/graphql'

const apiWs = prod ?
    'wss://baby-feed-history-be.herokuapp.com/subscriptions' :
    'ws://localhost:3000/subscriptions'

const commonPlugins = [
    new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(apiUrl),
        'process.env.API_WS': JSON.stringify(apiWs),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
        },
    }),
    new MiniCssExtractPlugin({
        filename: 'style-[hash].css',
    }),
]

const prodPlugins = [
    ...commonPlugins,
    new TerserPlugin({
        parallel: true,
        terserOptions: {
            compress: prod,
            mangle: prod,
            format: {
                comments: dev,
            },
        },
    })
]

module.exports = {
    mode: dev ? "development" : "production",
    //devtool: dev? 'source-map': 'hidden-source-map',
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
        path: outputDir,
        filename: 'bundle-[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.html/,
                use: ['html-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: dev ? '[local]' : '[hash:base64:5]'
                            },
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                include: path.join(__dirname, 'src'),
                use: {
                    loader: 'file-loader',
                    options: {
                        options: {
                            name() {
                                if (dev) {
                                    return '[path][name].[ext]';
                                }

                                return '[contenthash].[ext]';
                            },
                        },
                        outputPath: outputDir
                    }
                }
            }
        ],
    },
    plugins: prod ? prodPlugins : commonPlugins,
    devServer: {
        contentBase: 'dist',
        compress: true,
        port: 8080,
        historyApiFallback: true,
    },
}
