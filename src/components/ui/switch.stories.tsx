import { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { useArgs } from "@storybook/preview-api";

const meta = {
  title: "Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
  render: function Render(args) {
    const [, setArgs] = useArgs();
    return <Switch {...args} onChange={(checked) => setArgs({ checked })} />;
  },
} satisfies Story;

export const WithLabel: Story = {
  args: {
    checked: false,
  },
  render: function Render(args) {
    const [, setArgs] = useArgs();
    return (
      <div className="flex items-center gap-2">
        <Switch {...args} onChange={(checked) => setArgs({ checked })} />
        <span className="text-sm">Enable notifications</span>
      </div>
    );
  },
} satisfies Story;

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
} satisfies Story;

export const Checked: Story = {
  args: {
    checked: true,
  },
} satisfies Story;
