import { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta = {
  title: "Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message here...",
  },
} satisfies Story;

export const WithRows: Story = {
  args: {
    placeholder: "Enter a longer message...",
    rows: 5,
  },
} satisfies Story;

export const WithValue: Story = {
  args: {
    value:
      "This is a pre-filled textarea with some content that demonstrates how it looks when there is existing text.",
    rows: 3,
  },
} satisfies Story;

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
} satisfies Story;

export const WithError: Story = {
  args: {
    placeholder: "Enter your message",
    "aria-invalid": true,
    className: "border-red-500 focus:border-red-500",
  },
} satisfies Story;
