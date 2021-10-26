const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public/dist'),
        filename: 'script.min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"],
                    "plugins": [
                        ["@babel/plugin-transform-runtime",
                          {
                            "regenerator": true
                          }
                        ]
                      ]
                }
            }
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        }]
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true
    }
};