import { Inter } from "next/font/google";

import React from "react";

import { Preview } from "@storybook/react";
// import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

import "../src/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

// const arrows = {
//   ArrowUp: ArrowUp,
//   ArrowDown: ArrowDown,
//   ArrowLeft: ArrowLeft,
//   ArrowRight: ArrowRight,
// };

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
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
  // argTypes: {
  //   arrow: {
  //     options: Object.keys(arrows),
  //     mapping: arrows,
  //     control: {
  //       type: "select",
  //       labels: {
  //         ArrowUp: "Up",
  //         ArrowDown: "Down",
  //         ArrowLeft: "Left",
  //         ArrowRight: "Right",
  //       },
  //     },
  //   },
  // },
  decorators: [
    (Story) => (
      <main className={inter.className}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
