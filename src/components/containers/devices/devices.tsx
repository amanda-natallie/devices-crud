import { useAppSelector } from 'store';

import { DeviceItem } from './components';

function Devices() {
  const { devices } = useAppSelector(state => state.devicesState);

  return (
    <div className="container my-6 px-0">
      <h3 className="font-medium text-md pl-4 mb-2">Devices</h3>
      <div className="flex flex-col w-full">
        {devices.map(device => (
          <DeviceItem key={device.id} {...device} />
        ))}
      </div>
    </div>
  );
}

export default Devices;
