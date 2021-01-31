const { get } = require("app-root-dir");
const path = require("path");

const rootDir = get();

const alias = {
  svelte: path.resolve("node_modules", "svelte"),
  components: path.resolve(rootDir, "src", "shared", "components"),
  routes: path.resolve(rootDir, "src", "shared", "routes"),
  "@url": path.resolve(rootDir, "src", "shared", "url.js"),
};

module.exports = alias;
