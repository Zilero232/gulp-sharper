import globals from "globals";
import tsLint from "typescript-eslint";
import configPrettier from "eslint-config-prettier";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";

const eslint = [
  // config parsers
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: globals.node,
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
      },
    },
  },
  // config envs
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  // syntax rules
  ...tsLint.configs.recommended,
  // code style rules
  configPrettier,
  // plugins
  {
    name: "zilero/imports",
    plugins: {
      "plugin-simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "sort-imports": "off",
      "import/order": "off",
      "import/extensions": "off",
      "plugin-simple-import-sort/exports": "error",
    },
  },
  // ignores
  {
    ignores: ["./node_modules/*"],
  },
];

export default eslint;
