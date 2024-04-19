import { render } from 'utils/test';

import AddEditDeviceView from './add-edit-device-view';

describe('AddEditDeviceView', () => {
  it('renders correctly and responds to modal toggle', () => {
    const { getByText } = render(<AddEditDeviceView />);

    expect(getByText('Add/Edit Device')).toBeInTheDocument();
    expect(getByText('Device Name')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
