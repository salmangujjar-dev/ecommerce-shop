import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta = {
  title: "Badge",
  component: Badge,
  argTypes: {
    color: {
      control: "select",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: "Badge",
  },
} satisfies Story;
