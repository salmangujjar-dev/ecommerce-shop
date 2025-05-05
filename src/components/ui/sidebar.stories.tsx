import { Meta, StoryObj } from "@storybook/react";
import { Sidebar, SidebarHeader, SidebarBody, SidebarFooter } from "./sidebar";
import { Button } from "./button";

const meta = {
  title: "Sidebar",
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </SidebarHeader>
      <SidebarBody>
        <nav className="space-y-1">
          <Button plain className="w-full justify-start">
            Overview
          </Button>
          <Button plain className="w-full justify-start">
            Analytics
          </Button>
          <Button plain className="w-full justify-start">
            Reports
          </Button>
          <Button plain className="w-full justify-start">
            Settings
          </Button>
        </nav>
      </SidebarBody>
      <SidebarFooter>
        <Button plain className="w-full justify-start">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  ),
} satisfies Story;

export const WithCustomWidth: Story = {
  render: () => (
    <Sidebar className="w-80">
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Wide Sidebar</h2>
      </SidebarHeader>
      <SidebarBody>
        <p className="text-sm text-gray-500">
          This sidebar has a custom width of 320px
        </p>
      </SidebarBody>
    </Sidebar>
  ),
} satisfies Story;
