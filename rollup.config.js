import svelte from "rollup-plugin-svelte";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";
import aliasPlugin from "@rollup/plugin-alias";

const alias = require("./configs/alias.config");
const isDev = process.env.NODE_ENV === "development";

// server uses rollup, because when building with webpack, for some reason results in 'svelte' not defined or App.render is not defined
// client use webpack, because when rendering, for some reason, require is not defined; babel did not work
export default [
  {
    input: "src/shared/App.svelte",
    output: {
      sourcemap: false,
      format: "cjs",
      name: "app",
      file: "src/server/renderer/build/App.js",
    },
    inlineDynamicImports: true,
    plugins: [
      svelte({
        compilerOptions: {
          generate: "ssr",
          hydratable: true,
          css: true,
        },
        emitCss: false,
      }),
      css({ output: false }),

      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      !isDev && terser(),
      aliasPlugin({
        entries: alias,
      }),
    ],
  },
];
