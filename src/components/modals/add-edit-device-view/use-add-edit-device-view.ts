import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { deviceTypeConfig } from 'config/deviceTypeConfig';
import { toast } from 'sonner';
import { FormValues, IDevice, schema } from 'types';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDevicesActions, useModalActions } from 'hooks';

import { useAddDevice, useEditDevice } from './handlers';

const useAddEditDeviceView = () => {
  const { closeModal } = useModalActions();
  const { setSelectedDevice } = useDevicesActions();

  const { isAddSubmiting, onAddSubmit } = useAddDevice();

  const { isEdit, isEditFetching, isEditSubmitting, deviceFromAPI, onEditSubmit, onCloseEdit } =
    useEditDevice();

  const formMethods = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      id: '',
      system_name: '',
      type: undefined,
      hdd_capacity: 0,
    },
  });

  useEffect(() => {
    if (deviceFromAPI && isEdit) {
      const fieldsToUpdate: Array<keyof IDevice> = ['id', 'system_name', 'type', 'hdd_capacity'];
      fieldsToUpdate.forEach(field => {
        formMethods.setValue(field, deviceFromAPI[field], { shouldTouch: true });
      });
    }
  }, [deviceFromAPI, formMethods, isEdit]);

  const onClose = () => {
    closeModal();
    setSelectedDevice(null);
    onCloseEdit();
  };

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      if (deviceFromAPI && JSON.stringify(deviceFromAPI) === JSON.stringify(data)) {
        onClose();
        toast('No changes were made. The device was not updated.');
        return;
      }

      onEditSubmit(data);
    } else {
      onAddSubmit(data);
    }
  };
  const isFetching = isEditFetching;
  const isSubmitting = isEdit ? isEditSubmitting : isAddSubmiting;
  const shouldDisableButtons = isSubmitting || isEditFetching;

  const actions = {
    cancel: {
      onClick: () => onClose(),
      className: 'text-primary hover:text-primary/80',
      disabled: shouldDisableButtons,
    },
    submit: {
      label: 'Submit',
      disabled: shouldDisableButtons,
      loading: isSubmitting,
    },
  };
  const selectItems = deviceTypeConfig.filter(({ id }) => id !== 'ALL');
  return {
    actions,
    isEdit,
    isFetching,
    isSubmitting,
    formMethods,
    selectItems,
    onSubmit,
    deviceFromAPI,
  };
};

export default useAddEditDeviceView;
