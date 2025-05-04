import { Inter } from "next/font/google";

import React from "react";

import { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

import "../src/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

// const arrows = {
//   ArrowUp: ArrowUp,
//   ArrowDown: ArrowDown,
//   ArrowLeft: ArrowLeft,
//   ArrowRight: ArrowRight,
// };

const isPreferDarkColorScheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
);

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    docs: {
      theme: isPreferDarkColorScheme ? themes.dark : themes.light,
    },
    backgrounds: {
      default: isPreferDarkColorScheme ? "dark" : "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333" },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <main className={inter.className}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
