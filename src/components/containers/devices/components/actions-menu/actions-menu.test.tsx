import { AddEditDeviceView, DeleteDeviceView } from 'components/modals';

import { fireEvent, render, screen, waitFor, within } from 'utils/test';

import { ActionsMenu } from './actions-menu';

describe('ActionsMenu component', () => {
  beforeEach(() => {
    render(<ActionsMenu id="test" />);
  });
  it('renders ActionsMenu', () => {
    expect(screen.getByTestId('options-menu-trigger')).toBeInTheDocument();
  });

  it('opens the edit modal when the edit button is clicked', async () => {
    fireEvent.click(screen.getByTestId('options-menu-trigger'));

    waitFor(() => {
      const editButton = within(screen.getByRole('button')).getByRole('button', { name: /edit/i });

      fireEvent.click(editButton);
      expect(AddEditDeviceView).toHaveBeenCalledWith(
        expect.objectContaining({ isOpen: true }),
        expect.anything(),
      );
    });
  });
  it('opens the delete modal when the delete button is clicked', async () => {
    fireEvent.click(screen.getByTestId('options-menu-trigger'));

    waitFor(() => {
      const editButton = within(screen.getByRole('button')).getByRole('button', {
        name: /delete/i,
      });

      fireEvent.click(editButton);
      expect(DeleteDeviceView).toHaveBeenCalledWith(
        expect.objectContaining({ isOpen: true }),
        expect.anything(),
      );
    });
  });
});
