import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import { vi } from 'vitest';

import { render, screen } from 'utils/test';

import Devices from './devices';

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({
  devicesState: { devices: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] },
});

vi.mock('./components', () => ({
  DeviceItem: () => <div>Mock DeviceItem</div>,
}));

describe('Devices component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Devices />
      </Provider>,
    );
  });
  it('renders Devices', () => {
    expect(screen.getByText('Devices')).toBeInTheDocument();
  });

  it('renders 4 DeviceItem components', () => {
    const deviceItems = screen.getAllByText('Mock DeviceItem');
    expect(deviceItems).toHaveLength(4);
  });
});
