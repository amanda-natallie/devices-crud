import { AddEditDeviceModal, DeleteDeviceModal } from 'components/modals';

import { fireEvent, render, screen, waitFor, within } from 'utils/test';

import { ActionsMenu } from './actions-menu';

describe('ActionsMenu component', () => {
  it('renders ActionsMenu', () => {
    render(<ActionsMenu />);
    expect(screen.getByTestId('options-menu-trigger')).toBeInTheDocument();
  });

  it('opens the edit modal when the edit button is clicked', async () => {
    render(<ActionsMenu />);
    fireEvent.click(screen.getByTestId('options-menu-trigger'));

    waitFor(() => {
      const editButton = within(screen.getByRole('button')).getByRole('button', { name: /edit/i });

      fireEvent.click(editButton);
      expect(AddEditDeviceModal).toHaveBeenCalledWith(
        expect.objectContaining({ isOpen: true }),
        expect.anything(),
      );
    });
  });
  it('opens the delete modal when the delete button is clicked', async () => {
    render(<ActionsMenu />);
    fireEvent.click(screen.getByTestId('options-menu-trigger'));

    waitFor(() => {
      const editButton = within(screen.getByRole('button')).getByRole('button', {
        name: /delete/i,
      });

      fireEvent.click(editButton);
      expect(DeleteDeviceModal).toHaveBeenCalledWith(
        expect.objectContaining({ isOpen: true }),
        expect.anything(),
      );
    });
  });
});
