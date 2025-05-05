import { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxField, CheckboxGroup } from "./checkbox";
import { Description, Label } from "./fieldset";
import { ComponentProps } from "react";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  args: {
    defaultChecked: true,
    name: "acknowledgement",
    "aria-label": "I agree",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: "Checkbox",
  },
} satisfies Story;

export const WithLabel = {
  args: {
    label: "I agree to the terms and conditions",
  },
  render: (args) => {
    return (
      <CheckboxField>
        <Checkbox {...args} />
        <Label>{args?.label}</Label>
      </CheckboxField>
    );
  },
} satisfies StoryObj<ComponentProps<typeof Checkbox> & { label?: string }>;

export const WithDescription = {
  args: {
    label: "I agree to the terms and conditions",
    description:
      "By checking this box, you agree to our Terms of Service and Privacy Policy.",
  },
  render: (args) => {
    return (
      <CheckboxField>
        <Checkbox {...args} />
        <Label>{args?.label}</Label>
        <Description>{args?.description}</Description>
      </CheckboxField>
    );
  },
} satisfies StoryObj<
  ComponentProps<typeof Checkbox> & { label?: string; description?: string }
>;

export const Group = {
  render: () => (
    <CheckboxGroup>
      <CheckboxField>
        <Checkbox name="show_on_events_page" defaultChecked />
        <Label>Show on events page</Label>
        <Description>Make this event visible on your profile.</Description>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="allow_embedding" />
        <Label>Allow embedding</Label>
        <Description>
          Allow others to embed your event details on their own site.
        </Description>
      </CheckboxField>
    </CheckboxGroup>
  ),
} satisfies Story;
