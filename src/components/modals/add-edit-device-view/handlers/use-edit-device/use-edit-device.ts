import { useEffect } from 'react';

import { toast } from 'sonner';
import { useAppSelector } from 'store';
import { useLazyGetDeviceByIdQuery, usePutDeviceMutation } from 'store/api';
import { FormValues, IDevice } from 'types';

import { useDevicesActions, useModalActions } from 'hooks';

import { toCapitalize } from 'utils/common';

const useEditDevice = () => {
  const { setDeviceFromAPI } = useDevicesActions();
  const { closeModal } = useModalActions();
  const [getById, getByIdState] = useLazyGetDeviceByIdQuery();
  const [editDevice, { isLoading: isEditSubmitting }] = usePutDeviceMutation();
  const { selectedDevice, deviceFromAPI } = useAppSelector(state => state.devicesState);

  useEffect(() => {
    const getDeviceById = async (id: string) => {
      await getById(id);
    };

    if (selectedDevice && !deviceFromAPI) {
      getDeviceById(selectedDevice!);
    }
  }, [deviceFromAPI, getById, getByIdState.data, getByIdState.isSuccess, selectedDevice]);

  const onCloseEdit = () => {
    setDeviceFromAPI(undefined);
  };

  const onEditSubmit = async (data: FormValues) => {
    try {
      await editDevice({
        ...data,
        hdd_capacity: data.hdd_capacity.toString(),
      } as IDevice);
      const { hdd_capacity: hdd, system_name: system, type } = data;
      toast.success('Successfully updated the device.', {
        description: `Device: ${system}, Type: ${toCapitalize(type)} workstation, HDD Capacity: ${hdd} GB`,
      });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  const { isFetching: isEditFetching } = getByIdState;

  return {
    isEdit: !!selectedDevice,
    isEditFetching,
    isEditSubmitting,
    deviceFromAPI,
    onEditSubmit,
    onCloseEdit,
  };
};

export default useEditDevice;
