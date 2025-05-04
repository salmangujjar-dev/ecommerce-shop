import { Meta, StoryObj } from "@storybook/react";
import { SidebarLayout } from "./sidebar-layout";
import { Sidebar, SidebarHeader, SidebarBody, SidebarFooter } from "./sidebar";
import { Button } from "./button";

const meta = {
  title: "SidebarLayout",
  component: SidebarLayout,
} satisfies Meta<typeof SidebarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbar: (
      <div className="h-16 border-b bg-white px-4 flex items-center">
        <h1 className="text-lg font-semibold">Application</h1>
      </div>
    ),
    sidebar: (
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
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="mt-4">This is the main content area of the layout.</p>
      </div>
    ),
  },
} satisfies Story;

export const WithCustomWidth: Story = {
  args: {
    navbar: (
      <div className="h-16 border-b bg-white px-4 flex items-center">
        <h1 className="text-lg font-semibold">Application</h1>
      </div>
    ),
    sidebar: (
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
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="mt-4">
          This is the main content area with a wide sidebar.
        </p>
      </div>
    ),
  },
} satisfies Story;
