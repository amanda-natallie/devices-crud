import { DeviceItem } from './components';

function Devices() {
  return (
    <div className="container my-6 px-0">
      <h3 className="font-medium text-md pl-4 mb-2">Devices</h3>
      <div className="flex flex-col w-full">
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
        <DeviceItem />
      </div>
    </div>
  );
}

export default Devices;
