import { Meta, StoryObj } from "@storybook/react";
import {
  Listbox,
  ListboxOption,
  ListboxLabel,
  ListboxDescription,
} from "./listbox";

interface Person {
  id: number;
  name: string;
  role: string;
}

const meta = {
  title: "Listbox",
  component: Listbox<Person>,
} satisfies Meta<typeof Listbox<Person>>;

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
    placeholder: "Select a person",
    "aria-label": "Assignee",
    children: (
      <>
        {people.map((person) => (
          <ListboxOption key={person.id} value={person}>
            <ListboxLabel>{person.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </>
    ),
  },
} satisfies Story;

export const WithDescriptions: Story = {
  args: {
    placeholder: "Select a person",
    "aria-label": "Assignee",
    children: (
      <>
        {people.map((person) => (
          <ListboxOption key={person.id} value={person}>
            <ListboxLabel>{person.name}</ListboxLabel>
            <ListboxDescription>{person.role}</ListboxDescription>
          </ListboxOption>
        ))}
      </>
    ),
  },
} satisfies Story;

export const WithCustomOption: Story = {
  args: {
    placeholder: "Select a person",
    "aria-label": "Custom Option",
    children: (
      <>
        {people.map((person) => (
          <ListboxOption key={person.id} value={person}>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-200" />
              <div>
                <ListboxLabel>{person.name}</ListboxLabel>
                <ListboxDescription>{person.role}</ListboxDescription>
              </div>
            </div>
          </ListboxOption>
        ))}
      </>
    ),
  },
} satisfies Story;
