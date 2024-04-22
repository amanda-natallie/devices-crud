import { useEffect } from 'react';

import { useAppSelector } from 'store';
import { useLazyGetDeviceByIdQuery, usePutDeviceMutation } from 'store/api';
import { FormValues, IDevice } from 'types';

import { useDevicesActions } from 'hooks';

const useEditDevice = () => {
  const { setDeviceFromAPI } = useDevicesActions();
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
    await editDevice({
      ...data,
      hdd_capacity: data.hdd_capacity.toString(),
    } as IDevice);
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
