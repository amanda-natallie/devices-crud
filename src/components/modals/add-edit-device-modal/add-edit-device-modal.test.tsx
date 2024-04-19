import { vi } from 'vitest';

import { render } from 'utils/test';

import AddEditDeviceModal from './add-edit-device-modal';

describe('AddEditDeviceModal', () => {
  it('renders correctly and responds to modal toggle', () => {
    const setIsModalOpen = vi.fn();
    const { getByText } = render(<AddEditDeviceModal isOpen setIsModalOpen={setIsModalOpen} />);

    expect(getByText('Add/Edit Device')).toBeInTheDocument();
    expect(getByText('Device Name')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
