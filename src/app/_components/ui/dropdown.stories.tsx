import { Meta, StoryObj } from "@storybook/react";
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  DropdownHeading,
  DropdownDivider,
  DropdownLabel,
  DropdownDescription,
  DropdownShortcut,
} from "./dropdown";

const meta = {
  title: "Dropdown",
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <Dropdown>
      <DropdownButton>Open Menu</DropdownButton>
      <DropdownMenu>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
} satisfies Story;

export const WithSections = {
  render: () => (
    <Dropdown>
      <DropdownButton>Open Menu</DropdownButton>
      <DropdownMenu>
        <DropdownSection>
          <DropdownHeading>Section 1</DropdownHeading>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownSection>
        <DropdownDivider />
        <DropdownSection>
          <DropdownHeading>Section 2</DropdownHeading>
          <DropdownItem>Item 3</DropdownItem>
          <DropdownItem>Item 4</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  ),
} satisfies Story;

export const WithDescriptions = {
  render: () => (
    <Dropdown>
      <DropdownButton>Open Menu</DropdownButton>
      <DropdownMenu>
        <DropdownItem>
          <DropdownLabel>Profile</DropdownLabel>
          <DropdownDescription>
            Manage your account settings
          </DropdownDescription>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem>
          <DropdownLabel>Settings</DropdownLabel>
          <DropdownShortcut keys={["⌘", "S"]} />
        </DropdownItem>
        <DropdownItem>
          <DropdownLabel>Logout</DropdownLabel>
          <DropdownShortcut keys={["⌘", "Q"]} />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ),
} satisfies Story;
