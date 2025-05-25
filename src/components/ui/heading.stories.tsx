import { Meta, StoryObj } from '@storybook/react';
import { Heading } from './heading';

const meta = {
  title: 'Heading',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
} satisfies Story;

export const H2: Story = {
  args: {
    level: 2,
    children: 'Heading Level 2',
  },
} satisfies Story;

export const H3: Story = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
} satisfies Story;

export const H4: Story = {
  args: {
    level: 4,
    children: 'Heading Level 4',
  },
} satisfies Story;

export const WithClassName: Story = {
  args: {
    level: 1,
    children: 'Custom Styled Heading',
    className: 'text-blue-600 font-bold',
  },
} satisfies Story;
