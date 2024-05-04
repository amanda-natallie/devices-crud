import { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from 'store';
import { DEVICE_TYPES, DeviceType, IDevice } from 'types';

import { getSortStrategy } from './filter-strategy';

const useFilter = () => {
  const [filteredDevices, setFilteredDevices] = useState<IDevice[]>([]);
  const { devices, orderBy, orderResultBy, deviceTypes, searchValue } = useAppSelector(
    state => state.devicesState,
  );

  const sortDevices = useCallback(
    (list: IDevice[]) => {
      const sorter = getSortStrategy(orderResultBy, orderBy);
      return sorter ? [...list].sort(sorter) : list;
    },
    [orderBy, orderResultBy],
  );

  const isDeviceTypeSelected = useCallback(
    (device: IDevice) =>
      deviceTypes.includes(DEVICE_TYPES.ALL) ||
      deviceTypes.length === 0 ||
      deviceTypes.includes(device.type as DeviceType),
    [deviceTypes],
  );

  const isDeviceMatchingSearch = useCallback(
    (device: IDevice) =>
      searchValue.length === 0 ||
      device.system_name.toLowerCase().includes(searchValue.toLowerCase()),
    [searchValue],
  );

  const filteredAndSortedDevices = useMemo(() => {
    const filtered = devices.filter(
      device => isDeviceTypeSelected(device) && isDeviceMatchingSearch(device),
    );
    return sortDevices(filtered);
  }, [devices, sortDevices, isDeviceTypeSelected, isDeviceMatchingSearch]);

  useEffect(() => {
    setFilteredDevices(filteredAndSortedDevices);
  }, [filteredAndSortedDevices]);

  return {
    filteredDevices,
    resetFilter: () => setFilteredDevices(sortDevices(devices)),
  };
};

export default useFilter;
