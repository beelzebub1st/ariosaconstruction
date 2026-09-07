import { defineConfig, globalIgnores } from "eslint/config";

/** Lint disabled — ignore the whole project. */
const eslintConfig = defineConfig([
  globalIgnores(["**/*"]),
]);

export default eslintConfig;
