import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from 'store';
import { vi } from 'vitest';

import { act, renderHook, waitFor } from 'utils/test';

import useDeviceTypeSelect from './use-device-type-select';

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useDeviceTypeSelect', () => {
  const mockSetDeviceTypes = vi.fn();
  const useAppSelector = vi.fn();

  beforeEach(() => {
    useAppSelector.mockReturnValue({
      devicesState: {
        deviceTypes: ['ALL'],
      },
    });
    const useDevicesActions = vi.fn();
    useDevicesActions.mockReturnValue({
      setDeviceTypes: mockSetDeviceTypes,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should handle change device type', () => {
    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    act(() => {
      result.current.handleChangeDeviceType(true, 'ALL');
    });

    waitFor(() => {
      expect(mockSetDeviceTypes).toHaveBeenCalledWith([]);
    });
  });

  it('should check selected device type', () => {
    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    const isSelected = result.current.checkSelected('ALL');

    expect(isSelected).toBe(true);
  });

  it('should get selected devices label', () => {
    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    const label = result.current.getSelectedDevicesLabel;

    expect(label).toBe('All');
  });
  it('should handle change device type when unchecked', () => {
    useAppSelector.mockReturnValue({
      devicesState: {
        deviceTypes: ['device1'],
      },
    });

    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    act(() => {
      result.current.handleChangeDeviceType(false, 'LINUX');
    });

    waitFor(() => {
      expect(mockSetDeviceTypes).toHaveBeenCalledWith([]);
    });
  });

  it('should add selected device type when it is not already selected', () => {
    useAppSelector.mockReturnValue({
      devicesState: {
        deviceTypes: [],
      },
    });

    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    act(() => {
      result.current.handleChangeDeviceType(true, 'MAC');
    });

    waitFor(() => {
      expect(mockSetDeviceTypes).toHaveBeenCalledWith(['MAC']);
    });
  });

  it('should remove the selected device type if already selected and not handling ALL or third device', () => {
    useAppSelector.mockReturnValue({
      devicesState: {
        deviceTypes: ['LINUX'],
      },
    });

    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    act(() => {
      result.current.handleChangeDeviceType(true, 'LINUX');
    });

    waitFor(() => {
      expect(mockSetDeviceTypes).toHaveBeenCalledWith([]);
    });
  });
  it('should get selected devices label with specific devices', () => {
    useAppSelector.mockReturnValue({
      devicesState: {
        deviceTypes: [],
      },
    });

    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    const label = result.current.getSelectedDevicesLabel;

    expect(label).toBe('All');
  });
  it('should test isAllIncluded when deviceTypes length is neither 0 nor 3', () => {
    useAppSelector.mockReturnValue({
      devicesState: {
        deviceTypes: ['MAC', 'LINUX'],
      },
    });

    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    waitFor(() => {
      expect(result.current.isAllIncluded).toBe(false);
    });
  });
  it('should setDeviceTypes with filtered value when device is alreadySelected', () => {
    useAppSelector.mockReturnValue({
      devicesState: {
        deviceTypes: ['LINUX', 'WINDOWS'],
      },
    });

    const { result } = renderHook(() => useDeviceTypeSelect(), { wrapper });

    act(() => {
      result.current.handleChangeDeviceType(true, 'WINDOWS');
    });

    waitFor(() => {
      expect(mockSetDeviceTypes).toHaveBeenCalledWith(['LINUX']); // 'device1' should be removed
    });
  });
});
