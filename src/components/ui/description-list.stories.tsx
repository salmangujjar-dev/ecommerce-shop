import { Meta, StoryObj } from '@storybook/react';
import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from './description-list';

const meta = {
  title: 'DescriptionList',
  component: DescriptionList,
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionTerm>Name</DescriptionTerm>
      <DescriptionDetails>John Doe</DescriptionDetails>

      <DescriptionTerm>Email</DescriptionTerm>
      <DescriptionDetails>john@example.com</DescriptionDetails>

      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetails>Software Engineer</DescriptionDetails>
    </DescriptionList>
  ),
} satisfies Story;

export const WithLongContent: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionTerm>Project Description</DescriptionTerm>
      <DescriptionDetails>
        This is a long description that might wrap to multiple lines. It
        contains detailed information about the project, its goals, and its
        implementation details. The text should flow naturally and maintain
        proper spacing and alignment.
      </DescriptionDetails>

      <DescriptionTerm>Technical Requirements</DescriptionTerm>
      <DescriptionDetails>
        React, TypeScript, Tailwind CSS, and other modern web technologies. The
        project requires attention to detail and a focus on user experience.
      </DescriptionDetails>
    </DescriptionList>
  ),
} satisfies Story;
