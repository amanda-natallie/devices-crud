import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { useAppSelector } from 'store';
import { useLazyGetDeviceByIdQuery, usePutDeviceMutation } from 'store/api';
import { FormValues, IDevice } from 'types';

const useEditDevice = () => {
  const [getById, getByIdState] = useLazyGetDeviceByIdQuery();
  const [editDevice, { isLoading: isEditSubmitting, error: editError }] = usePutDeviceMutation();
  const [deviceFromAPI, setDeviceFromAPI] = useState<IDevice | undefined>(undefined);
  const { selectedDevice } = useAppSelector(state => state.devicesState);

  useEffect(() => {
    const getDeviceById = async (id: string) => {
      const { data } = await getById(id);
      setDeviceFromAPI({
        ...data!,
        hdd_capacity: Number(data!.hdd_capacity),
      });
    };

    if (selectedDevice && !deviceFromAPI) {
      getDeviceById(selectedDevice!);
    }
  }, [deviceFromAPI, getById, getByIdState.data, getByIdState.isSuccess, selectedDevice]);

  const onCloseEdit = () => {
    setDeviceFromAPI(undefined);
  };

  const onEditSubmit = async (data: FormValues) => {
    await editDevice(data as IDevice)
      .then(() => {
        onCloseEdit();
        toast.success(`The devices list was successfully updated with device ${data.system_name}`);
      })
      .catch(() => {
        toast(`An error occurred while trying to update the device. Error: ${editError}`);
      });
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
