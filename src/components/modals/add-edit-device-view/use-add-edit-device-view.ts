import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { useAppSelector } from 'store';
import { useLazyGetDeviceByIdQuery, usePostDeviceMutation, usePutDeviceMutation } from 'store/api';
import { IDevice } from 'types';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDevicesActions, useModalActions } from 'hooks';

type OnCLick = () => void | SubmitHandler<IDevice>;

const useAddEditDeviceView = () => {
  const [getById, getByIdState] = useLazyGetDeviceByIdQuery();
  const [
    addDevice,
    { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError, error: addError },
  ] = usePostDeviceMutation();
  const [
    editDevice,
    { isLoading: isEditLoading, isSuccess: isEditSuccess, isError: isEditError, error: editError },
  ] = usePutDeviceMutation();
  const [deviceFromAPI, setDeviceFromAPI] = useState<IDevice | undefined>(undefined);
  const { selectedDevice } = useAppSelector(state => state.devicesState);
  const { closeModal } = useModalActions();
  const { setSelectedDevice } = useDevicesActions();

  const isEdit = !!selectedDevice;

  useEffect(() => {
    const getDeviceById = async (id: string) => {
      const { data } = await getById(id);
      setDeviceFromAPI(data);
    };

    if (isEdit || (isEdit && getByIdState.isSuccess && !getByIdState.data)) {
      getDeviceById(selectedDevice);
    }
  }, [getById, getByIdState.data, getByIdState.isSuccess, isEdit, selectedDevice]);

  const schema = z.object({
    id: z.string().optional(),
    system_name: z
      .string({
        required_error: 'System Name is required',
      })
      .min(3, {
        message: 'System Name must be at least 3 characters',
      }),
    type: z.string({
      required_error: 'Device Type is required',
    }),
    hdd_capacity: z
      .number({
        required_error: 'HDD Capacity is required',
        invalid_type_error: 'HDD Capacity must be a number',
      })
      .min(4, {
        message: 'HDD Capacity must be greater than 4 GB',
      }),
  });

  const formMethods = useForm<z.infer<typeof schema>>({
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

  const handleAfterSubmit = useCallback(
    (systemName: string) => {
      closeModal();
      setSelectedDevice(null);
      setDeviceFromAPI(undefined);
      toast(`The devices list was successfully updated with device ${systemName}`);
    },
    [closeModal, setSelectedDevice, setDeviceFromAPI],
  );

  const handleAfterError = useCallback(() => {
    toast(
      `An error occurred while trying to ${isEdit ? 'update' : 'create'} the device. Error: ${addError || editError}`,
    );
  }, [addError, editError, isEdit]);

  const handleAddDevice = async (data: z.infer<typeof schema>) => {
    await addDevice(data);
  };

  const handleEditDevice = async (data: z.infer<typeof schema>) => {
    await editDevice({
      ...data,
      id: deviceFromAPI!.id,
    });
  };

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (isEdit) {
      handleEditDevice(data);
    } else {
      handleAddDevice(data);
    }
  };

  useEffect(() => {
    if (isAddSuccess || isEditSuccess) {
      handleAfterSubmit(formMethods.getValues().system_name);
    }
    if (isAddError || isEditError) {
      handleAfterError();
    }
  }, [
    isAddSuccess,
    formMethods,
    isEditSuccess,
    handleAfterSubmit,
    isAddError,
    isEditError,
    handleAfterError,
  ]);

  const { isFetching } = getByIdState;
  const isSubmitting = isAddLoading || isEditLoading;
  const shouldDisableButtons = isSubmitting || isFetching;

  const actions = {
    primary: {
      onClick: () => {
        closeModal();
        setSelectedDevice(null);
        setDeviceFromAPI(undefined);
      },
      className: 'text-primary hover:text-primary/80',
    },
    secondary: {
      label: 'Submit',
      onClick: onSubmit as OnCLick,
      isDisabled: shouldDisableButtons,
    },
  };

  return {
    actions,
    isEdit,
    isFetching,
    isSubmitting,
    formMethods,
    onSubmit,
    deviceFromAPI,
  };
};

export default useAddEditDeviceView;
