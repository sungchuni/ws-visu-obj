const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const { resolve } = require("path");

const PATH = {};
PATH.ROOT = process.cwd();
PATH.SRC = resolve(PATH.ROOT, "src");
PATH.DIST = resolve(PATH.ROOT, "dist");

module.exports = {
  mode: "none",
  entry: { index: resolve(PATH.SRC, "index.js") },
  output: {
    filename: "[name].js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-react"]]
            }
          }
        ]
      }
    ]
  },
  externals: [
    {
      gsap: {
        commonjs: "gsap",
        commonjs2: "gsap",
        amd: "gsap",
        root: "gsap"
      },
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      }
    },
    /^intersection-observer$/
  ],
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    })
  ],
  resolve: {
    plugins: [PnpWebpackPlugin]
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)]
  }
};
