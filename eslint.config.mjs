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
    rules: {
      "no-unused-vars": "error",
      "@typescript-eslint/no-unused-vars": ["error"],
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
              pattern: "next/**",
              group: "external",
              patternOptions: { matchBase: true },
              position: "before",
            },
            {
              pattern: "@app/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@components/ui/**",
              group: "internal",
              patternOptions: { matchBase: true },
              position: "after",
            },
            {
              pattern: "@components/**",
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
