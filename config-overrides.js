const { override, fixBabelImports, addLessLoader } = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color":"#41085c",
        "@btn-primary-bg": "linear-gradient(91deg,#4f2b79,#9c0067)",
        "@btn-link-hover-bg":"transparent",
      },
    },
  }),
);