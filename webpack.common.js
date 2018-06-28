const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: {
        appJS: './src/appJS.ts',
        appCSS: './src/appCSS.ts',
        vendorsCSS: './src/vendorsCSS.ts'
    },
    plugins: [
        // new ExtractTextPlugin("bundle.min.css")
    ],
    output: {
        filename: '[name].min.js',
        path: path.resolve("./dist"),
        // publicPath: "./"
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "underscore-template-loader",
                        options: {
                            attributes: ['img:src', 'x-img:src']
                        }
                        /*
                        html loader
                        options: {
                            attrs: ["img:src" /!*"link:href"*!/],
                            interpolate: true,
                            /!*minimize: true*!/
                        },*/
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                // exclude: /node_modules/
            },
            /*{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },*/
            {
                test: /\.css$/,
                use: [
                    /*include in style markup*/
                    { loader: 'style-loader' },
                    {
                        loader: "css-loader",
                        options: {
                            /*sourceMap: true,*/
                            minimize: true
                        }
                    }

                    /*include as files*/
                    /*{
                        loader: "file-loader",
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            /!*sourceMap: true,*!/
                            minimize: true
                        }
                    }*/,
                ]
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    /** file-loader | url-loader | raw-loader **/
                    {
                        loader: 'url-loader',
                        options: {
                            // quality: 85
                            fallback: 'file-loader',
                            limit: 512
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        },
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            minSize: 1,
            maxAsyncRequests: 10,
            cacheGroups: {
                vendorsCSS: {
                    // test: /[\\/]node_modules[\\/].+\\.(js|ts)/,
                    // test(chunks) {
                    //     console.log("chunk => " + chunks.name);
                    //     // exclude `my-excluded-chunk`
                    //     return true;
                    // },
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendorsCSS',
                    chunks: chunk => chunk.name === "vendorsCSS",
                    priority: 1
                },
                vendorsJS: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendorsJS',
                    chunks: chunk => chunk.name !== "vendorsCSS",
                    priority: 0
                }
            }
        }
    }

};

const glob = require('glob');
const files = glob.sync(process.cwd() + '/src/*.html');
files.forEach(file => {
    config.plugins.push(new HtmlWebpackPlugin({
        filename: path.basename(file),
        template: file,
        inject: true
    }))
});

module.exports = config;