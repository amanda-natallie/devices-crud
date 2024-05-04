import getSortStrategy from './filter-strategy';

onmessage = function (e) {
  const { devices, deviceTypes, searchValue, orderResultBy, orderBy } = e.data;
  const sorter = getSortStrategy(orderResultBy, orderBy);

  let filteredDevices = devices.filter(
    device =>
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
