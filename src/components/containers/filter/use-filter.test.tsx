import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from 'store';
import { DEVICE_TYPES } from 'types';
import { vi } from 'vitest';

import { renderHook, waitFor } from '@testing-library/react';

import useFilter from './use-filter';

const useAppSelector = vi.fn();

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('useFilter hook', () => {
  beforeEach(() => {
    useAppSelector.mockImplementation(() => ({
      devicesState: {
        devices: [
          { id: '1', system_name: 'Alpha', type: 'WINDOWS', hdd_capacity: '256' },
          { id: '2', system_name: 'Beta', type: 'MAC', hdd_capacity: '512' },
          { id: '3', system_name: 'Gamma', type: 'LINUX', hdd_capacity: '128' },
        ],
        orderBy: 'ASC',
        orderResultBy: 'system_name',
        deviceTypes: [],
        searchValue: '',
      },
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('isDeviceTypeSelected', () => {
    it('should return all devices if deviceTypes includes DEVICE_TYPES.ALL', async () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          deviceTypes: [DEVICE_TYPES.ALL],
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      await waitFor(() => {
        expect(result.current.filteredDevices.length).toBe(3);
      });
    });

    it('should return all devices if deviceTypes length is 0', () => {
      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices.length).toBe(3);
    });

    it('should return all WINDOWS devices if deviceTypes includes DEVICE_TYPES.WINDOWS', () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          deviceTypes: ['WINDOWS'],
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'WINDOWS' }),
      ]);
    });

    it('should return all MAC devices if deviceTypes includes DEVICE_TYPES.MAC', () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          deviceTypes: ['MAC'],
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([expect.objectContaining({ type: 'MAC' })]);
    });

    it('should return all LINUX devices if deviceTypes includes DEVICE_TYPES.LINUX', () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          deviceTypes: ['LINUX'],
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([expect.objectContaining({ type: 'LINUX' })]);
    });

    it('should return all WINDOWS & MAC devices if deviceTypes includes DEVICE_TYPES.WINDOWS and DEVICE_TYPES.MAC', () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          deviceTypes: ['WINDOWS', 'MAC'],
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'WINDOWS' }),
        expect.objectContaining({ type: 'MAC' }),
      ]);
    });
    it('should return all WINDOWS & LINUX devices if deviceTypes includes DEVICE_TYPES.WINDOWS and DEVICE_TYPES.LINUX', () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          deviceTypes: ['WINDOWS', 'LINUX'],
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'WINDOWS' }),
        expect.objectContaining({ type: 'LINUX' }),
      ]);
    });
    it('should return all MAC & LINUX devices if deviceTypes includes DEVICE_TYPES.MAC and DEVICE_TYPES.LINUX', () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          deviceTypes: ['MAC', 'LINUX'],
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'MAC' }),
        expect.objectContaining({ type: 'LINUX' }),
      ]);
    });
  });

  describe('isDeviceMatchingSearch', () => {
    it('should return all devices if searchValue length is 0', () => {
      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices.length).toBe(3);
    });

    it('should return devices that match the search', () => {
      useAppSelector.mockImplementation(() => ({
        devicesState: {
          searchValue: 'alpha',
        },
      }));

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ system_name: 'Alpha' }),
      ]);
    });
  });
});
