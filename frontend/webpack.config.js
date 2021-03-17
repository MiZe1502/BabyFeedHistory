const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`dev: ${dev}`)
console.log(`prod: ${prod}`)

module.exports = {
    mode: dev ? "development" : "production",
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle-[hash].js',
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
                exclude: '/node_modules/'
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: dev ? '[local]' : '[hash]'
                            },
                        }
                    },
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
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
    ],
    devServer: {
        contentBase: 'dist',
        compress: true,
        port: 8080,
    },
}
