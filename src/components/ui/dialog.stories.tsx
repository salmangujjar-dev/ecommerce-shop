import { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from './dialog';
import { Button } from './button';
import { useArgs } from '@storybook/preview-api';

const meta = {
  title: 'Dialog',
  component: Dialog,
  args: {
    open: false,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

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
          Open Dialogue
        </Button>
        <Dialog {...args} open={args.open} onClose={handleClose}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a dialog description</DialogDescription>
          <DialogBody>
            <p>This is the dialog body content.</p>
          </DialogBody>
          <DialogActions>
            <Button onClick={handleClose}>Confirm</Button>
            <Button plain onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  },
} satisfies Story;
