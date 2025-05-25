import { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from './table';

const meta = {
  title: 'Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Inactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
} satisfies Story;

export const WithCustomClass: Story = {
  render: () => (
    <Table className='border-collapse'>
      <TableHeader>
        <TableRow>
          <TableHead className='bg-gray-100'>Product</TableHead>
          <TableHead className='bg-gray-100'>Price</TableHead>
          <TableHead className='bg-gray-100'>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Laptop</TableCell>
          <TableCell>$999</TableCell>
          <TableCell>In Stock</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Smartphone</TableCell>
          <TableCell>$699</TableCell>
          <TableCell>Low Stock</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
} satisfies Story;

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className='text-center text-gray-500'>
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
} satisfies Story;
