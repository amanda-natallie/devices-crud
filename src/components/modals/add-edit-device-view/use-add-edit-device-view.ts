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
    mode: 'onChange',
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
        const value =
          field === 'hdd_capacity' ? parseInt(deviceFromAPI[field], 10) : deviceFromAPI[field];
        formMethods.setValue(field, value, { shouldTouch: true });
      });
    }
  }, [deviceFromAPI, formMethods, isEdit]);

  const onClose = () => {
    closeModal();
    setSelectedDevice(null);
    onCloseEdit();
  };

  const onEdit = () => {
    formMethods.reset();
    onClose();
    toast('No changes were made. The device was not updated.');
  };

  const onAdd = (payload: {
    system_name: string;
    type: string;
    hdd_capacity: number;
    id?: string;
  }) => {
    onAddSubmit(payload);
    formMethods.reset();
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      hdd_capacity: data.hdd_capacity.toString(),
    };
    if (!isEdit) return onAdd(data);

    return deviceFromAPI && JSON.stringify(deviceFromAPI) === JSON.stringify(payload)
      ? onEdit()
      : onEditSubmit(data);
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
