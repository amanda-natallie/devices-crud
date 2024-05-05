import { memo } from 'react';

import useFilter from 'components/containers/filter/use-filter';
import VirtualizedList, { RenderRowProps } from 'components/ui/virtualized-list';

import { DeviceItem } from './components';

const MemoizedDeviceItem = memo(DeviceItem);

function Devices() {
  const { filteredDevices } = useFilter();

  return (
    <div className="container my-6 px-0 lg:h-[calc(100vh-270px)] md:h-[calc(100vh-330px)] h-[calc(100vh-400px)]">
      <h2 className="font-medium text-md pl-4 mb-2" data-testid="devices-list-title">
        Devices
      </h2>
      {filteredDevices.length > 0 ? (
        <div className="flex w-full h-full" data-testid="devices-list">
          <VirtualizedList
            renderRow={({ index, style }: RenderRowProps) => (
              <MemoizedDeviceItem
                key={filteredDevices[index].id}
                {...filteredDevices[index]}
                style={style}
              />
            )}
            itemCount={filteredDevices.length}
            itemSize={60}
          />
        </div>
      ) : (
        <h3 className="text-center text-gray-500 border-y py-5">No devices found</h3>
      )}
    </div>
  );
}

export default memo(Devices);
