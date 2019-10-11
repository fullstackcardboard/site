const path = require('path');

module.exports = {
    entry: {
        lisboa: "./lisboa/scripts/app.js"
    },
    output: {
        path: path.resolve(__dirname, './lisboa/scripts/build'),
        filename: 'lisboa.js'
    },
    // IMPORTANT NOTE: If you are using Webpack 2 or above, replace "loaders" with "rules"
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    }
}