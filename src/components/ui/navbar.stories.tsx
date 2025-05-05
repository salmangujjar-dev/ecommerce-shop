import { Meta, StoryObj } from "@storybook/react";
import {
  Navbar,
  NavbarSection,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
} from "./navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="/">
          <NavbarLabel>Home</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/dashboard" current>
          <NavbarLabel>Dashboard</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/projects">
          <NavbarLabel>Projects</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      <NavbarDivider />
      <NavbarSection>
        <NavbarItem href="/settings">
          <NavbarLabel>Settings</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  ),
};

export const WithMultipleSections: Story = {
  render: () => (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="/">
          <NavbarLabel>Home</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/dashboard" current>
          <NavbarLabel>Dashboard</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      <NavbarDivider />
      <NavbarSection>
        <NavbarItem href="/projects">
          <NavbarLabel>Projects</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/team">
          <NavbarLabel>Team</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      <NavbarDivider />
      <NavbarSection>
        <NavbarItem href="/settings">
          <NavbarLabel>Settings</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/profile">
          <NavbarLabel>Profile</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  ),
};
