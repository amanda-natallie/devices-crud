import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from 'store';
import { DeviceType, IDevice } from 'types';

const useFilter = () => {
  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);

  const { devices, orderBy, orderResultBy, deviceTypes, searchValue } = useAppSelector(
    state => state.devicesState,
  );

  const defaultSort = useCallback(
    (list: IDevice[]) => {
      const draft = [...list];

      if (orderResultBy === 'hdd_capacity' && orderBy === 'ASC') {
        return draft.sort((a, b) => parseInt(a.hdd_capacity, 10) - parseInt(b.hdd_capacity, 10));
      }
      return draft;
    },
    [orderBy, orderResultBy],
  );

  const resetFilter = useCallback(() => {
    const draft = [...devices];
    draft.sort((a, b) => parseInt(a.hdd_capacity, 10) - parseInt(b.hdd_capacity, 10));
    setFilteredDevices(draft);
  }, [devices]);

  const filterByType = useCallback(() => {
    if (deviceTypes.includes('ALL') || deviceTypes.length === 0) {
      return devices;
    }
    return defaultSort(devices.filter(device => deviceTypes.includes(device.type as DeviceType)));
  }, [deviceTypes, defaultSort, devices]);

  const filterBySearch = useCallback(
    () =>
      defaultSort(
        searchValue.length === 0
          ? devices
          : devices.filter(device =>
              device.system_name.toLowerCase().includes(searchValue.toLowerCase()),
            ),
      ),
    [defaultSort, devices, searchValue],
  );

  const filterBySort = useCallback(
    (data: IDevice[]) =>
      data.sort((a, b) => {
        if (orderResultBy === 'system_name') {
          return orderBy === 'ASC'
            ? a.system_name.localeCompare(b.system_name)
            : b.system_name.localeCompare(a.system_name);
        }
        const numA = Number(a.hdd_capacity);
        const numB = Number(b.hdd_capacity);
        return orderBy === 'ASC' ? numA - numB : numB - numA;
      }),
    [orderBy, orderResultBy],
  );

  const filterDevices = useCallback(() => {
    let results = filterByType();
    results = filterBySearch().filter(device => results.includes(device));
    results = filterBySort(results);
    return results;
  }, [filterByType, filterBySearch, filterBySort]);

  useEffect(() => {
    const resultsFiltered = filterDevices();
    setFilteredDevices(resultsFiltered);
  }, [devices, orderBy, orderResultBy, deviceTypes, searchValue, filterDevices]);

  useEffect(() => {
    if (devices.length > 0 && filteredDevices.length === 0 && !searchValue) {
      resetFilter();
    }
  }, [devices, filteredDevices, resetFilter, searchValue]);

  return {
    filteredDevices,
    resetFilter,
  };
};

export default useFilter;
