import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, RadioField } from './radio';

const meta: Meta<typeof Radio> = {
  title: 'Radio',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue='option1'>
      <RadioField>
        <Radio value='option1' />
      </RadioField>
    </RadioGroup>
  ),
};

export const Group: Story = {
  render: () => (
    <RadioGroup defaultValue='option1'>
      <RadioField>
        <Radio value='option1' />
      </RadioField>
      <RadioField>
        <Radio value='option2' />
      </RadioField>
      <RadioField>
        <Radio value='option3' />
      </RadioField>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue='option1'>
      <RadioField>
        <Radio value='option1' />
        <span data-slot='label'>Option 1</span>
        <span data-slot='description'>This is the first option</span>
      </RadioField>
      <RadioField>
        <Radio value='option2' />
        <span data-slot='label'>Option 2</span>
        <span data-slot='description'>This is the second option</span>
      </RadioField>
      <RadioField>
        <Radio value='option3' />
        <span data-slot='label'>Option 3</span>
        <span data-slot='description'>This is the third option</span>
      </RadioField>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue='option1'>
      <RadioField>
        <Radio value='option1' disabled />
        <span data-slot='label'>Disabled Option</span>
      </RadioField>
    </RadioGroup>
  ),
};
