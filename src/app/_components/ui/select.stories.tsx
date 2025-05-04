import { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

interface Person {
  id: number;
  name: string;
  role: string;
}

const meta = {
  title: "Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const people: Person[] = [
  { id: 1, name: "Leslie Alexander", role: "Co-Founder / CEO" },
  { id: 2, name: "Michael Foster", role: "Co-Founder / CTO" },
  { id: 3, name: "Dries Vincent", role: "Business Relations" },
  { id: 4, name: "Lindsay Walton", role: "Front-end Developer" },
  { id: 5, name: "Courtney Henry", role: "Designer" },
  { id: 6, name: "Tom Cook", role: "Director of Product" },
  { id: 7, name: "Wade Warren", role: "Senior Developer" },
  { id: 8, name: "Bessie Cooper", role: "Community Manager" },
];

export const Default: Story = {
  args: {
    "aria-label": "Assignee",
    children: (
      <>
        <option value="">Select a person</option>
        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name}
          </option>
        ))}
      </>
    ),
  },
} satisfies Story;

export const WithDescriptions: Story = {
  args: {
    "aria-label": "Assignee",
    children: (
      <>
        <option value="">Select a person</option>
        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name} - {person.role}
          </option>
        ))}
      </>
    ),
  },
} satisfies Story;

export const WithCustomOption: Story = {
  args: {
    "aria-label": "Custom Option",
    children: (
      <>
        <option value="">Select a person</option>
        {people.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name} ({person.role})
          </option>
        ))}
      </>
    ),
  },
} satisfies Story;
