import { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationList,
  PaginationPage,
  PaginationGap,
} from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationPrevious href='/page/1' />
      <PaginationList>
        <PaginationPage href='/page/1'>1</PaginationPage>
        <PaginationPage href='/page/2' current>
          2
        </PaginationPage>
        <PaginationPage href='/page/3'>3</PaginationPage>
        <PaginationGap />
        <PaginationPage href='/page/10'>10</PaginationPage>
      </PaginationList>
      <PaginationNext href='/page/3' />
    </Pagination>
  ),
};

export const FirstPage: Story = {
  render: () => (
    <Pagination>
      <PaginationPrevious href={null} />
      <PaginationList>
        <PaginationPage href='/page/1' current>
          1
        </PaginationPage>
        <PaginationPage href='/page/2'>2</PaginationPage>
        <PaginationPage href='/page/3'>3</PaginationPage>
        <PaginationGap />
        <PaginationPage href='/page/10'>10</PaginationPage>
      </PaginationList>
      <PaginationNext href='/page/2' />
    </Pagination>
  ),
};

export const LastPage: Story = {
  render: () => (
    <Pagination>
      <PaginationPrevious href='/page/9' />
      <PaginationList>
        <PaginationPage href='/page/1'>1</PaginationPage>
        <PaginationGap />
        <PaginationPage href='/page/8'>8</PaginationPage>
        <PaginationPage href='/page/9'>9</PaginationPage>
        <PaginationPage href='/page/10' current>
          10
        </PaginationPage>
      </PaginationList>
      <PaginationNext href={null} />
    </Pagination>
  ),
};
