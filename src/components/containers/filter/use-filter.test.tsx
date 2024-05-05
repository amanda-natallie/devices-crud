import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store, useAppSelector } from 'store';
import { DEVICE_TYPES } from 'types';
import { vi } from 'vitest';

import { renderHook } from '@testing-library/react';

import useFilter from './use-filter';

vi.mock('store');

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const mockDevices = [
  { id: '1', system_name: 'Alpha', type: 'WINDOWS', hdd_capacity: '256' },
  { id: '2', system_name: 'Beta', type: 'MAC', hdd_capacity: '512' },
  { id: '3', system_name: 'Gamma', type: 'LINUX', hdd_capacity: '128' },
];

describe('useFilter hook', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('isDeviceTypeSelected', () => {
    it('should return all devices if deviceTypes includes DEVICE_TYPES.ALL', async () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.ALL],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });

      expect(result.current.filteredDevices.length).toBe(3);
    });

    it('should return all devices if deviceTypes length is 0', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [],
        searchValue: '',
      });
      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices.length).toBe(3);
    });

    it('should return all WINDOWS devices if deviceTypes includes DEVICE_TYPES.WINDOWS', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.WINDOWS],
        searchValue: '',
      });
      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'WINDOWS' }),
      ]);
    });

    it('should return all MAC devices if deviceTypes includes DEVICE_TYPES.MAC', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.MAC],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([expect.objectContaining({ type: 'MAC' })]);
    });

    it('should return all LINUX devices if deviceTypes includes DEVICE_TYPES.LINUX', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.LINUX],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([expect.objectContaining({ type: 'LINUX' })]);
    });

    it('should return all WINDOWS & MAC devices if deviceTypes includes DEVICE_TYPES.WINDOWS and DEVICE_TYPES.MAC', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.WINDOWS, DEVICE_TYPES.MAC],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'WINDOWS' }),
        expect.objectContaining({ type: 'MAC' }),
      ]);
    });
    it('should return all WINDOWS & LINUX devices if deviceTypes includes DEVICE_TYPES.WINDOWS and DEVICE_TYPES.LINUX', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.WINDOWS, DEVICE_TYPES.LINUX],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'WINDOWS' }),
        expect.objectContaining({ type: 'LINUX' }),
      ]);
    });
    it('should return all MAC & LINUX devices if deviceTypes includes DEVICE_TYPES.MAC and DEVICE_TYPES.LINUX', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.MAC, DEVICE_TYPES.LINUX],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ type: 'MAC' }),
        expect.objectContaining({ type: 'LINUX' }),
      ]);
    });
  });

  describe('isDeviceMatchingSearch', () => {
    it('should return all devices if searchValue length is 0', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.ALL],
        searchValue: '',
      });
      const { result } = renderHook(() => useFilter(), { wrapper });
      expect(result.current.filteredDevices.length).toBe(3);
    });

    it('should return devices that match the search', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'asc',
        orderResultBy: 'id',
        deviceTypes: [DEVICE_TYPES.ALL],
        searchValue: 'Alpha',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });

      expect(result.current.filteredDevices).toEqual([
        expect.objectContaining({ system_name: 'Alpha' }),
      ]);
    });
  });

  describe('isDeviceSorted', () => {
    it('should return devices sorted by system_name in ascending order', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'ASC',
        orderResultBy: 'system_name',
        deviceTypes: [DEVICE_TYPES.ALL],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });

      expect(result.current.filteredDevices).toEqual([
        mockDevices[0],
        mockDevices[1],
        mockDevices[2],
      ]);
    });

    it('should return devices sorted by system_name in descending order', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'DESC',
        orderResultBy: 'system_name',
        deviceTypes: [DEVICE_TYPES.ALL],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });

      expect(result.current.filteredDevices).toEqual([
        mockDevices[2],
        mockDevices[1],
        mockDevices[0],
      ]);
    });

    it('should return devices sorted by hdd_capacity in ascending order', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'ASC',
        orderResultBy: 'hdd_capacity',
        deviceTypes: [DEVICE_TYPES.ALL],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });

      expect(result.current.filteredDevices).toStrictEqual([
        mockDevices[2],
        mockDevices[0],
        mockDevices[1],
      ]);
    });
    it('should return devices sorted by hdd_capacity in descending order', () => {
      vi.mocked(useAppSelector).mockReturnValue({
        devices: mockDevices,
        orderBy: 'DESC',
        orderResultBy: 'hdd_capacity',
        deviceTypes: [DEVICE_TYPES.ALL],
        searchValue: '',
      });

      const { result } = renderHook(() => useFilter(), { wrapper });

      expect(result.current.filteredDevices).toStrictEqual([
        mockDevices[1],
        mockDevices[0],
        mockDevices[2],
      ]);
    });
  });
});
