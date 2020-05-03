const path = require('path');

module.exports = {
  entry: {
    lisboa: "./lisboa/scripts/app.js",
    dinosaurIsland: "./cards/dinosaurisland/scripts/app.js",
    birmingham: "./cards/birmingham/scripts/app.js",
    clank: "./cards/clank/scripts/app.js",
    excavationEarth: "./cards/excavation-earth/scripts/app.js"
  },
  output: {
    path: path.resolve(__dirname, "./scripts/build"),
    filename: "[name].js"
  },
  // IMPORTANT NOTE: If you are using Webpack 2 or above, replace "loaders" with "rules"
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};