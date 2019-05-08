const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.ts", smsCreditCalc: "./src/smsCreditCalc.ts" },
  target: "node",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"],
            plugins: ["transform-es2015-arrow-functions"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};
