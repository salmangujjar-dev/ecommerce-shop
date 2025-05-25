import { Meta, StoryObj } from '@storybook/react';
import {
  Fieldset,
  Legend,
  Field,
  Label,
  Description,
  ErrorMessage,
} from './fieldset';
import { Input } from './input';

const meta = {
  title: 'Fieldset',
  component: Fieldset,
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Fieldset>
      <Legend>Personal Information</Legend>
      <Field>
        <Label>First Name</Label>
        <Input type='text' placeholder='Enter your first name' />
        <Description>Your legal first name</Description>
      </Field>
      <Field>
        <Label>Last Name</Label>
        <Input type='text' placeholder='Enter your last name' />
        <Description>Your legal last name</Description>
      </Field>
      <Field>
        <Label>Email</Label>
        <Input type='email' placeholder='Enter your email' />
        <Description>We will never share your email</Description>
      </Field>
    </Fieldset>
  ),
} satisfies Story;

export const WithError: Story = {
  render: () => (
    <Fieldset>
      <Legend>Contact Information</Legend>
      <Field>
        <Label>Email</Label>
        <Input type='email' placeholder='Enter your email' />
        <ErrorMessage>Please enter a valid email address</ErrorMessage>
      </Field>
    </Fieldset>
  ),
} satisfies Story;

export const Disabled: Story = {
  render: () => (
    <Fieldset disabled>
      <Legend>Disabled Fieldset</Legend>
      <Field>
        <Label>Name</Label>
        <Input type='text' placeholder='Enter your name' />
        <Description>This field is disabled</Description>
      </Field>
    </Fieldset>
  ),
} satisfies Story;
