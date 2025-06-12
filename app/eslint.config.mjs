import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";


export default defineConfig([
  // Base ESLint recommended
  js.configs.recommended,

  // React configuration (replaces react-app)
  {
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks, 
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules, 
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },

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
    },
  },
]);
