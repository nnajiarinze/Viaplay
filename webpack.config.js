const path = require("path");
const webpack = require("webpack");

module.exports = (env) => {
  const mode = env.mode;

  return {
    mode: "production",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    target: "node",
    resolve: {
      extensions: [".ts", ".js"],
    },
    entry: {
      server: "./src/server.ts"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "build"),
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    devtool: "source-map",
    optimization:{
      minimize: false
    }
  };
};

