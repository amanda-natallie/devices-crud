import { toast } from 'sonner';
import { usePostDeviceMutation } from 'store/api';
import { FormValues } from 'types';

import { useDevicesActions, useModalActions } from 'hooks';

export default function useAddDevice() {
  const { closeModal } = useModalActions();
  const { setSelectedDevice } = useDevicesActions();

  const [addDevice, { isLoading: isAddSubmiting, error: addError }] = usePostDeviceMutation();

  const onAddSubmit = async (data: FormValues) => {
    await addDevice(data)
      .then(() => {
        closeModal();
        setSelectedDevice(null);
        toast.success(`The devices list was successfully updated with device ${data.system_name}`);
      })
      .catch(() => {
        toast.error(`An error occurred while trying to 'create the device. Error: ${addError}`);
      });
  };

  return {
    isAddSubmiting,
    onAddSubmit,
  };
}
