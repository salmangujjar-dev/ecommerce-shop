import { Meta, StoryObj } from '@storybook/react';
import { Divider } from './divider';

const meta = {
  title: 'Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
} satisfies Story;
