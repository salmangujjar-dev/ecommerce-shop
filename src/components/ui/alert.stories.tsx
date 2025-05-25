import { Meta, StoryObj } from '@storybook/react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertBody,
  AlertActions,
} from './alert';
import { Button } from './button';
import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Alert',
  component: Alert,
  args: {
    open: false,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default = {
  render: function Render(args) {
    const [, setArgs] = useArgs();

    const handleClose = () => {
      args.open = false;
      setArgs({ open: false });
    };

    const handleOpen = () => {
      args.open = true;
      setArgs({ open: true });
    };

    return (
      <>
        <Button type='button' onClick={handleOpen}>
          Open Alert
        </Button>
        <Alert {...args} open={args.open} onClose={handleClose}>
          <AlertBody>
            <AlertTitle>Title</AlertTitle>
            <AlertDescription>
              A quick brown fox jumps over the lazy dog. A quick brown fox jumps
              over the lazy dog. A quick brown fox jumps over the lazy dog. A
              quick brown fox jumps over the lazy dog.
            </AlertDescription>
            <AlertActions>
              <Button plain onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleClose}>Accept</Button>
            </AlertActions>
          </AlertBody>
        </Alert>
      </>
    );
  },
} satisfies Story;
