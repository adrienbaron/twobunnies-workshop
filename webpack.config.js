const path = require("path");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const JavaScriptObfuscator = require("webpack-obfuscator");

const IS_DEV_BUILD =
  process.env.NODE_ENV === "dev-web" || process.env.NODE_ENV === "dev-ios";
const IS_PROD_BUILD = process.env.NODE_ENV === "production";
const IS_DEV_WEB_BUILD = process.env.NODE_ENV === "dev-web";

const plugins = [];
const optionalEntries = [];
if (IS_PROD_BUILD) {
  plugins.push(
    new JavaScriptObfuscator({
      stringArray: false,
      debugProtection: true
    })
  );
}

if (IS_DEV_WEB_BUILD) {
  plugins.push(
    new WebpackPluginServe({
      liveReload: true,
      static: [path.resolve("./")]
    })
  );
  optionalEntries.push("webpack-plugin-serve/client");
}

module.exports = {
  mode: IS_PROD_BUILD ? "production" : "development",
  entry: [...optionalEntries, "./src/app.ts"],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  plugins,
  watch: IS_DEV_BUILD,
  devtool: IS_DEV_BUILD ? "inline-source-map" : false,
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".json"]
  }
};
