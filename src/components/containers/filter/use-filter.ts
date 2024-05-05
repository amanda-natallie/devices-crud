import { useMemo } from 'react';

import { useAppSelector } from 'store';
import { DEVICE_TYPES, DeviceType, IDevice } from 'types';

import { getSortStrategy } from 'utils/filter/sort-strategies';

const useFilter = () => {
  const { devices, orderBy, orderResultBy, deviceTypes, searchValue } = useAppSelector(
    state => state.devicesState,
  );

  const filteredDevices = useMemo(() => {
    const filterBySearchAndType = (device: IDevice) =>
      (deviceTypes.includes(DEVICE_TYPES.ALL) ||
        deviceTypes.length === 0 ||
        deviceTypes.includes(device.type as DeviceType)) &&
      (searchValue.length === 0 ||
        device.system_name.toLowerCase().includes(searchValue.toLowerCase()));

    const filtered = devices.filter(filterBySearchAndType);

    const sorter = getSortStrategy(orderResultBy, orderBy);
    return sorter ? filtered.sort(sorter) : filtered;
  }, [devices, orderBy, orderResultBy, deviceTypes, searchValue]);

  return {
    filteredDevices,
  };
};

export default useFilter;
