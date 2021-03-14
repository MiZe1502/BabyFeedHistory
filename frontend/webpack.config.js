const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

const path = require( 'path' );

module.exports = {
    context: __dirname,
    entry: './src/index.jsx',
    output: {
        path: path.resolve( __dirname, 'public' ),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                resolve: {
                    extensions: [".js", ".jsx"]
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },         {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve( __dirname, 'public/index.html' ),
            filename: 'index.html'
        })
    ]
};