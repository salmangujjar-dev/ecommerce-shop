import { Meta, StoryObj } from "@storybook/react";
import { AuthLayout } from "./auth-layout";
import { Button } from "./button";
import { Input } from "./input";

const meta = {
  title: "AuthLayout",
  component: AuthLayout,
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  render: () => (
    <AuthLayout>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  ),
} satisfies Story;
