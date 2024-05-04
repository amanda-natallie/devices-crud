import { IDevice } from 'types';

import { getSortStrategy } from 'utils/filter/sort/sort-strategies';

onmessage = function (e) {
  const { devices, deviceTypes, searchValue, orderResultBy, orderBy } = e.data;
  const sorter = getSortStrategy(orderResultBy, orderBy);

  let filteredDevices = devices.filter(
    (device: IDevice) =>
      (deviceTypes.includes('ALL') ||
        deviceTypes.length === 0 ||
        deviceTypes.includes(device.type)) &&
      (searchValue.length === 0 ||
        device.system_name.toLowerCase().includes(searchValue.toLowerCase())),
  );

  if (sorter) {
    filteredDevices = filteredDevices.sort(sorter);
  }

  postMessage(filteredDevices);
};
