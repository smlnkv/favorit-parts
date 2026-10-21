import { fixupConfigRules } from "@eslint/compat";
import js from "@eslint/js";
import importX from "eslint-plugin-import-x";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/*.config.js",
      "**/*.config.mjs"
    ]
  },

  js.configs.recommended,

  ...fixupConfigRules([
    {
      files: ["**/*.{js,jsx}"],
      ...react.configs.flat.recommended,
      settings: {
        react: { version: "19.3" }
      }
    },
    react.configs.flat["jsx-runtime"]
  ]),

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2023
      }
    },
    plugins: {
      "import-x": importX,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],

      "import-x/no-cycle": "error",
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ],

      "no-nested-ternary": "error",
      eqeqeq: ["error", "always"],

      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prefer-const": "error",
      "no-var": "error",

      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ]
    }
  },

  prettierConfig
];
