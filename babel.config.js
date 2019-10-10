module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: { version: 3 }
      }
    ]
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"]
    }
  },
  plugins: ["transform-class-properties"]
};
