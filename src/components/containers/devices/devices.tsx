import useFilter from 'components/containers/filter/use-filter';

import { DeviceItem } from './components';

function Devices() {
  const { filteredDevices } = useFilter();

  return (
    <div className="container my-6 px-0">
      <h3 className="font-medium text-md pl-4 mb-2" data-testid="devices-list-title">
        Devices
      </h3>
      <div className="flex flex-col w-full" data-testid="devices-list">
        {filteredDevices.length > 0 ? (
          filteredDevices.map(device => <DeviceItem key={device.id} {...device} />)
        ) : (
          <p className="text-center text-gray-500">No devices found</p>
        )}
      </div>
    </div>
  );
}

export default Devices;
