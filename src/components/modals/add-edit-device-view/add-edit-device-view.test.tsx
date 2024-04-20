import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from 'store';
import { vi } from 'vitest';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Dialog } from 'components/ui/dialog';

import AddEditDeviceView from './add-edit-device-view';
import useAddEditDeviceView from './use-add-edit-device-view';

vi.mock('./use-add-edit-device-view', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useAddEditDeviceView: vi.fn(() => ({
      onSubmit: vi.fn(),
      actions: {
        cancel: {
          onClick: vi.fn(),
        },
      },
    })),
  };
});
vi.mock('react-hook-form', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useForm: vi.fn(() => ({
      handleSubmit: vi.fn(callback => callback),
      register: vi.fn(),
      setValue: vi.fn(),
      getValues: vi.fn(() => ({
        system_name: 'Test System',
        type: 'desktop',
        hdd_capacity: 1000,
      })),
      watch: vi.fn(),
      getFieldState: vi.fn(),
      setError: vi.fn(),
    })),
  };
});

const mockUseAddEditDeviceView = useAddEditDeviceView as jest.MockedFunction<
  typeof useAddEditDeviceView
>;

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('AddEditDeviceView', () => {
  it('renders without crashing', () => {
    render(
      <Dialog>
        <AddEditDeviceView />
      </Dialog>,
      { wrapper },
    );
    waitFor(() => {
      expect(screen.getByText(/Add Device/i)).toBeInTheDocument();
    });
  });

  it('submits the form', async () => {
    render(
      <Dialog>
        <AddEditDeviceView />
      </Dialog>,
      { wrapper },
    );
    waitFor(() => {
      fireEvent.click(screen.getByText(/Submit/i));
      expect(mockUseAddEditDeviceView().onSubmit).toHaveBeenCalled();
    });
  });

  it('cancels the form', async () => {
    render(
      <Dialog>
        <AddEditDeviceView />
      </Dialog>,
      { wrapper },
    );
    waitFor(() => {
      fireEvent.click(screen.getByText(/Cancel/i));
      waitFor(() => expect(mockUseAddEditDeviceView().actions.cancel.onClick).toHaveBeenCalled());
    });
  });
});
