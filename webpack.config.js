const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isModeDev = process.env.NODE_ENV === "development";
const filename = (ext) =>
  isModeDev ? `[name]_bundle.${ext}` : `[name]_[contenthash]_bundle.${ext}`;

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src", "index.js"),
    statistics: path.resolve(__dirname, "src", "statistics.js"),
    request: path.resolve(__dirname, "src", "request.js"),
  },

  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    port: 4200,
  },

  devtool: isModeDev ? "source-map" : false,

  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new CssMinimizerPlugin()],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      minify: { collapseWhitespace: !isModeDev },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExractPlugin({
      filename: filename("css"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        //use: ["style-loader", "css-loader"],
        use: [MiniCssExractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        //use: ["style-loader", "css-loader"],
        use: [MiniCssExractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        type: "asset/resource", //модули ресурсов
      },
      {
        test: /\.ttf$/,
        type: "asset/resource", //шрифты
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: [["@babel/preset-env", { targets: "defaults" }]],
            presets: [
              ["@babel/preset-env", { targets: { chrome: 111, edge: 111 } }],
            ],
          },
        },
      },
    ],
  },
};
