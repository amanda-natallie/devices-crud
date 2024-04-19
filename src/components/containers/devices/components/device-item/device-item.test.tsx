import { render, screen } from 'utils/test';

import DeviceItem from './device-item';

describe('DeviceItem', () => {
  it('renders correctly', () => {
    render(
      <DeviceItem id="asdada" system_name="DESKTOP-0VCBIFF" type="WINDOWS" hdd_capacity={128} />,
    );

    expect(screen.getByText('DESKTOP-0VCBIFF')).toBeInTheDocument();
    expect(screen.getByText('Windows workstation - 128 GB')).toBeInTheDocument();
    expect(screen.getByTestId('options-menu-trigger')).toBeInTheDocument();
  });
});
