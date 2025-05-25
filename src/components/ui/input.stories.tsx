import { Meta, StoryObj } from '@storybook/react';
import { Input, InputGroup } from './input';
import { Mail } from 'lucide-react';

const meta = {
  title: 'Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    placeholder: 'Enter text...',
  },
} satisfies Story;

export const WithIcon = {
  render: () => (
    <InputGroup>
      <Mail
        data-slot='icon' /* important */
        className='w-4 h-4'
        strokeWidth={1.5}
        stroke='currentColor'
      />
      <Input placeholder='With icon' />
    </InputGroup>
  ),
} satisfies Story;
