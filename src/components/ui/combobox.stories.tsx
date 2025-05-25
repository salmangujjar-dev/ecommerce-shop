import { Meta, StoryObj } from '@storybook/react';
import {
  Combobox,
  ComboboxOption,
  ComboboxLabel,
  ComboboxDescription,
} from './combobox';

interface Person {
  id: number;
  name: string;
  role: string;
}

const meta = {
  title: 'Combobox',
  component: Combobox<Person>,
} satisfies Meta<typeof Combobox<Person>>;

export default meta;
type Story = StoryObj<typeof meta>;

const people: Person[] = [
  { id: 1, name: 'Leslie Alexander', role: 'Co-Founder / CEO' },
  { id: 2, name: 'Michael Foster', role: 'Co-Founder / CTO' },
  { id: 3, name: 'Dries Vincent', role: 'Business Relations' },
  { id: 4, name: 'Lindsay Walton', role: 'Front-end Developer' },
  { id: 5, name: 'Courtney Henry', role: 'Designer' },
  { id: 6, name: 'Tom Cook', role: 'Director of Product' },
  { id: 7, name: 'Wade Warren', role: 'Senior Developer' },
  { id: 8, name: 'Bessie Cooper', role: 'Community Manager' },
];

export const Default: Story = {
  args: {
    options: people,
    displayValue: (person) => person?.name ?? '',
    filter: (person, query) =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    placeholder: 'Select a person',
    'aria-label': 'Assignee',
    children: (person) => (
      <ComboboxOption value={person}>
        <ComboboxLabel>{person.name}</ComboboxLabel>
      </ComboboxOption>
    ),
  },
} satisfies Story;

export const WithDescriptions: Story = {
  args: {
    options: people,
    displayValue: (person) => person?.name ?? '',
    filter: (person, query) =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    placeholder: 'Select a person',
    'aria-label': 'Assignee',
    children: (person) => (
      <ComboboxOption value={person}>
        <ComboboxLabel>{person.name}</ComboboxLabel>
        <ComboboxDescription>{person.role}</ComboboxDescription>
      </ComboboxOption>
    ),
  },
} satisfies Story;

export const WithCustomFilter: Story = {
  args: {
    options: people,
    displayValue: (person) => person?.name ?? '',
    filter: (person, query) =>
      person.name.toLowerCase().startsWith(query.toLowerCase()),
    placeholder: 'Type to search...',
    'aria-label': 'Search People',
    children: (person) => (
      <ComboboxOption value={person}>
        <ComboboxLabel>{person.name}</ComboboxLabel>
        <ComboboxDescription>{person.role}</ComboboxDescription>
      </ComboboxOption>
    ),
  },
} satisfies Story;

export const WithCustomOption: Story = {
  args: {
    options: people,
    displayValue: (person) => person?.name ?? '',
    filter: (person, query) =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    placeholder: 'Select or type...',
    'aria-label': 'Custom Option',
    children: (person) => (
      <ComboboxOption value={person}>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-6 rounded-full bg-gray-200' />
          <div>
            <ComboboxLabel>{person.name}</ComboboxLabel>
            <ComboboxDescription>{person.role}</ComboboxDescription>
          </div>
        </div>
      </ComboboxOption>
    ),
  },
} satisfies Story;
