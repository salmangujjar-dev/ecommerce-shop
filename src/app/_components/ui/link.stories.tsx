import { Meta, StoryObj } from "@storybook/react";
import { Link } from "./link";

const meta = {
  title: "Link",
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    href: "#",
    children: "Default Link",
  },
} satisfies Story;

export const External = {
  args: {
    href: "https://example.com",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "External Link",
  },
} satisfies Story;
