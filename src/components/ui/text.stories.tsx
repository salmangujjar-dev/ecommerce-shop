import { Meta, StoryObj } from '@storybook/react';
import { Text, TextLink, Strong, Code } from './text';

const meta = {
  title: 'Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default text component',
  },
} satisfies Story;

export const WithLink: Story = {
  render: () => (
    <div className='space-y-2'>
      <Text>
        This is a paragraph with a <TextLink href='#'>link</TextLink> in it.
      </Text>
      <Text>
        You can also use <Strong>strong text</Strong> for emphasis.
      </Text>
      <Text>
        And <Code>code snippets</Code> for technical content.
      </Text>
    </div>
  ),
} satisfies Story;

export const WithCustomClass: Story = {
  args: {
    className: 'text-blue-600 font-semibold',
    children: 'This is custom styled text',
  },
} satisfies Story;

export const WithLongContent: Story = {
  args: {
    children:
      'This is a longer piece of text that demonstrates how the component handles wrapping and spacing. It includes multiple sentences to show how the text flows naturally within its container.',
  },
} satisfies Story;
