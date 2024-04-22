import { usePostDeviceMutation } from 'store/api';
import { FormValues, IDevice } from 'types';

export default function useAddDevice() {
  const [addDevice, { isLoading: isAddSubmiting }] = usePostDeviceMutation();

  const onAddSubmit = async (data: FormValues) => {
    const { hdd_capacity: hdd, system_name: name, type } = data;
    await addDevice({
      system_name: name,
      type,
      hdd_capacity: hdd.toString(),
    } as IDevice);
  };

  return {
    isAddSubmiting,
    onAddSubmit,
  };
}
