import { render } from '@testing-library/react';

import DeleteDeviceView from './delete-device-view';

describe('DeleteDeviceView', () => {
  it('renders correctly and responds to modal toggle', () => {
    const { getByText } = render(<DeleteDeviceView />);

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
