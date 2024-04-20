import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { useAppSelector } from 'store';
import { IDevice } from 'types';

import { useModalActions } from 'hooks';

const useDeleteDeviceView = () => {
  const { closeModal } = useModalActions();
  const [deviceFromStore, setSeviceFromStore] = useState<IDevice | undefined>(undefined);
  const { selectedDevice, devices } = useAppSelector(state => state.devicesState);

  useEffect(() => {
    const getDeviceById = async (id: string) => {
      const data = devices.find(device => device.id === id);
      setSeviceFromStore(data);
    };

    if (selectedDevice && !deviceFromStore) {
      getDeviceById(selectedDevice);
    }
  }, [deviceFromStore, devices, selectedDevice]);

  const onSubmit = () => {
    toast(`You submitted the following values: ${JSON.stringify(deviceFromStore, null, 2)}`);
  };

  const actions = {
    primary: {
      onClick: () => closeModal(),
    },
    secondary: {
      label: 'Delete',
      onClick: () => onSubmit(),
    },
  };

  return {
    actions,
    deviceName: deviceFromStore?.system_name,
    isLoading: !deviceFromStore,
  };
};

export default useDeleteDeviceView;
