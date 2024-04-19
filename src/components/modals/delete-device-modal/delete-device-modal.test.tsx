import { vi } from 'vitest';

import { render } from '@testing-library/react';

import DeleteDeviceModal from './delete-device-modal';

describe('DeleteDeviceModal', () => {
  it('renders correctly and responds to modal toggle', () => {
    const setIsModalOpen = vi.fn();
    const { getByText } = render(<DeleteDeviceModal isOpen setIsModalOpen={setIsModalOpen} />);

    expect(getByText('Delete device?')).toBeInTheDocument();
    expect(
      getByText(
        'You are about to delete the device DESKTOP-0VCBIFF. This action cannot be undone.',
      ),
    ).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
