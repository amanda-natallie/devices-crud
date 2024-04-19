import { render, screen } from 'utils/test';

import DeviceItem from './device-item';

describe('DeviceItem', () => {
  it('renders correctly', () => {
    render(<DeviceItem />);

    expect(screen.getByText('DESKTOP-0VCBIFF')).toBeInTheDocument();
    expect(screen.getByText('Windows workstation - 128 GB')).toBeInTheDocument();
    expect(screen.getByTestId('options-menu-trigger')).toBeInTheDocument();
  });
});
