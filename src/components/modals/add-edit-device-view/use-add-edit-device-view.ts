import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import { useAppSelector } from 'store';
import { useLazyGetDeviceByIdQuery } from 'store/api';
import { IDevice } from 'types';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useDevicesActions, useModalActions } from 'hooks';

type OnCLick = () => void | SubmitHandler<IDevice>;

const useAddEditDeviceView = () => {
  const [getById, getByIdState] = useLazyGetDeviceByIdQuery();
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

    if (isEdit) {
      getDeviceById(selectedDevice);
    }
  }, [getById, isEdit, selectedDevice]);

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

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast(`You submitted the following values: ${JSON.stringify(data, null, 2)}`);
  };
  const { isFetching } = getByIdState;
  const isSubmitting = false;
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
