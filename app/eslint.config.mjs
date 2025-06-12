
import globals from "globals";
import react from "eslint-plugin-react";
export default [

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,

        },
      },
      globals: globals.browser,
    },
    rules: {
      // "no-unused-state": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": "warn",


 },
 },
 react.configs.flat.recommended,
];
