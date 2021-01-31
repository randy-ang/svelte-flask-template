const { get } = require("app-root-dir");
const path = require("path");

const rootDir = get();

const alias = {
  svelte: path.resolve("node_modules", "svelte"),
  components: path.resolve(rootDir, "src", "client", "components"),
  routes: path.resolve(rootDir, "src", "client", "routes"),
};

module.exports = alias;
