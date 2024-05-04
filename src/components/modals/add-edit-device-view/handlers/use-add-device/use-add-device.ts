import { toast } from 'sonner';
import { usePostDeviceMutation } from 'store/api';
import { FormValues, IDevice } from 'types';

import { useModalActions } from 'hooks';

import { toCapitalize } from 'utils/common';

export default function useAddDevice() {
  const [addDevice, { isLoading: isAddSubmiting }] = usePostDeviceMutation();
  const { closeModal } = useModalActions();

  const onAddSubmit = async (data: FormValues) => {
    const { hdd_capacity: hdd, system_name: name, type } = data;

    try {
      await addDevice({
        system_name: name,
        type,
        hdd_capacity: hdd.toString(),
      } as IDevice);
      toast.success('Successfully created new device.', {
        description: `Device: ${name}, Type: ${toCapitalize(type)} workstation, HDD Capacity: ${hdd} GB`,
      });
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      closeModal();
    }
  };

  return {
    isAddSubmiting,
    onAddSubmit,
  };
}
