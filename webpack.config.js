

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    if (env) {
        return {
            mode: 'production',
            entry: ['@babel/polyfill', './src/axios.js'],
            output: {
                filename: 'axios.min.js',
                libraryTarget: 'umd',
                path: path.resolve(__dirname, 'lib'),
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ],
            },
            plugins: [
                new MinifyPlugin({}, {}),
                new CleanWebpackPlugin(),
            ]
        }
    }

    return {
        mode: 'development',
        entry: ['@babel/polyfill', './src/index.js'],
        output: {
            filename: 'bundle.js',
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new CleanWebpackPlugin(),
        ],
    }

};
