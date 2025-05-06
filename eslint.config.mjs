import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["**/*.stories.tsx"],
    rules: {
      "no-var": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/triple-slash-reference": "off",
      "react/no-unescaped-entities": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "server-only",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "next{,/**}",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react{,/**}",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@app/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@ui/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@common/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@store/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@lib/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "~trpc/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@hooks/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@utils/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@services/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@constants/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@assets/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@public/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "*.css",
              group: "index",
              patternOptions: { matchBase: true },
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: [],
          warnOnUnassignedImports: true,
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
