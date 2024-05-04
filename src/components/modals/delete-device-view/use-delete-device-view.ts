import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { useAppSelector } from 'store';
import { useDeleteDeviceMutation } from 'store/api';
import { IDevice } from 'types';

import { useModalActions } from 'hooks';

const useDeleteDeviceView = () => {
  const [deleteDevice, { isLoading }] = useDeleteDeviceMutation();
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

  const handleDeleteDevice = async () => {
    if (deviceFromStore) {
      try {
        await deleteDevice(deviceFromStore.id);
        toast.success(`Device ${deviceFromStore.system_name} deleted successfully.`);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        closeModal();
      }
    }
  };

  const onSubmit = () => {
    handleDeleteDevice();
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
    isSubmitting: isLoading,
  };
};

export default useDeleteDeviceView;
