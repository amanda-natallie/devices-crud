import useFilter from 'components/containers/filter/use-filter';

import { DeviceItem } from './components';

function Devices() {
  const { filteredDevices } = useFilter();

  return (
    <div className="container my-6 px-0">
      <h3 className="font-medium text-md pl-4 mb-2">Devices</h3>
      <div className="flex flex-col w-full">
        {filteredDevices.map(device => (
          <DeviceItem key={device.id} {...device} />
        ))}
      </div>
    </div>
  );
}

export default Devices;
