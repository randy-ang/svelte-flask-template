const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const appRootDir = require("app-root-dir");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const alias = require("./configs/alias.config");
const ROUTES = require("./src/shared/url");
const mode = process.env.NODE_ENV;
const dev = mode === "development";

const extensions = [".mjs", ".js", ".json", ".svelte", ".html"];
const mainFields = ["svelte", "module", "browser", "main"];

// server uses rollup, because when building with webpack, for some reason results in 'svelte' not defined or App.render is not defined
// client use webpack, because when rendering, for some reason, require is not defined; babel did not work
// emitCss is also broken, if true & you chunk it, then crash (only in production)
module.exports = [
  {
    name: "client",
    entry: path.resolve(appRootDir.get(), "src", "client", "main.js"),
    output: {
      path: path.resolve(appRootDir.get(), "dist"),
      filename: "main.js",
      chunkFilename: "[name].[contenthash].js",
      publicPath: "/",
    },
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              dev,
              css: true,
              // emitCss: true,
              hydratable: true,
              generate: "dom",
              // hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: ["file-loader"],
        },
        {
          test: /\.css$/,
          use: [
            /**
             * MiniCssExtractPlugin doesn't support HMR.
             * For developing, use 'style-loader' instead.
             * */
            dev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
      ],
    },
    mode: mode,
    plugins: [
      new webpack.DefinePlugin({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      new CopyWebpackPlugin([
        "public",
        {
          from: "public/index.html",
          to: "service-worker-index.html",
          transform(content) {
            // replace any {{ }} because that is jinja specific stuff and will be displayed as is when plainly served in html
            return content.toString().replace(/{{(.+)}}/g, "");
          },
        },
      ]),
      new MiniCssExtractPlugin({
        filename: "bundle.css",
        chunkFilename: dev ? "[id].css" : "[id].[hash].css",
      }),
      new AssetsPlugin({
        filename: "assets.json",
        path: path.resolve(appRootDir.get(), "dist"),
      }),
    ].filter(Boolean),
    devtool: dev && "inline-source-map",
  },
  {
    name: "service-worker",
    entry: {
      "service-worker": path.resolve(
        appRootDir.get(),
        "src",
        "service-worker.js"
      ),
    },
    output: {
      path: path.resolve(appRootDir.get(), "dist"),
      filename: "[name].js",
      chunkFilename: "[name].[id].[hash].js",
    },
    mode,
    plugins: [
      new webpack.DefinePlugin({
        TIMESTAMP: new Date().getTime(),
        ROUTES: JSON.stringify(ROUTES),
      }),
    ],
  },
];
