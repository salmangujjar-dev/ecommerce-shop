import { Meta, StoryObj } from "@storybook/react";
import { StackedLayout } from "./stacked-layout";
import { Button } from "./button";

const meta = {
  title: "StackedLayout",
  component: StackedLayout,
} satisfies Meta<typeof StackedLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbar: (
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Application</h1>
        <div className="flex items-center space-x-4">
          <Button plain>Settings</Button>
          <Button plain>Profile</Button>
        </div>
      </div>
    ),
    sidebar: (
      <div className="flex h-full flex-col">
        <div className="px-4 py-5">
          <h2 className="text-lg font-medium">Navigation</h2>
          <nav className="mt-4 space-y-1">
            <Button plain className="w-full justify-start">
              Dashboard
            </Button>
            <Button plain className="w-full justify-start">
              Projects
            </Button>
            <Button plain className="w-full justify-start">
              Team
            </Button>
            <Button plain className="w-full justify-start">
              Calendar
            </Button>
          </nav>
        </div>
      </div>
    ),
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Welcome</h3>
          <p className="mt-1 text-sm text-gray-500">
            This is the main content area of the stacked layout.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">Quick Stats</h4>
            <p className="mt-2 text-sm text-gray-500">
              View your recent activity
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">Recent Updates</h4>
            <p className="mt-2 text-sm text-gray-500">See what&apos;s new</p>
          </div>
        </div>
      </div>
    ),
  },
} satisfies Story;

export const Simple: Story = {
  args: {
    navbar: (
      <div className="flex items-center">
        <h1 className="text-lg font-semibold">Simple Layout</h1>
      </div>
    ),
    sidebar: (
      <div className="px-4 py-5">
        <nav className="space-y-1">
          <Button plain className="w-full justify-start">
            Home
          </Button>
          <Button plain className="w-full justify-start">
            About
          </Button>
        </nav>
      </div>
    ),
    children: (
      <div>
        <p>This is a simple stacked layout with minimal navigation.</p>
      </div>
    ),
  },
} satisfies Story;
