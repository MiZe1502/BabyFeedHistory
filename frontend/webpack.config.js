const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`dev: ${dev}`)
console.log(`prod: ${prod}`)

const outputDir = path.resolve(__dirname, 'dist');

module.exports = {
    mode: dev ? "development" : "production",
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx')
    },
    output: {
        path: outputDir,
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
