import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "19.1",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      // "prettier/prettier": ["error", { singleQuote: true, semi: false }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  pluginReact.configs.flat.recommended,
]);
