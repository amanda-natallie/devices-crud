import { vi } from 'vitest';

import { render, screen } from 'utils/test';

import Devices from './devices';

vi.mock('./components', () => ({
  DeviceItem: () => <div>Mock DeviceItem</div>,
}));

describe('Devices component', () => {
  it('renders Devices', () => {
    render(<Devices />);
    expect(screen.getByText('Devices')).toBeInTheDocument();
  });

  it('renders 4 DeviceItem components', () => {
    render(<Devices />);
    const deviceItems = screen.getAllByText('Mock DeviceItem');
    expect(deviceItems).toHaveLength(4);
  });
});
