import { toast } from 'sonner';
import { setDeviceFromAPIAction, setDevicesAction, setSelectedDeviceAction } from 'store/slices';
import { closeModalAction } from 'store/slices/modalsSlice';
import {
  IGetDeviceByIdResponse,
  IGetDevicesResponse,
  IPostDevicePayload,
  IPostDeviceResponse,
  IPutDevicePayload,
  IPutDeviceResponse,
} from 'types';

import { toCapitalize } from 'utils/common';

import { publicAPI } from './api';

export const devicesApi = publicAPI.injectEndpoints({
  endpoints: builder => ({
    getDevices: builder.query<IGetDevicesResponse, void>({
      query: () => '/devices',
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setDevicesAction(data));
      },
      providesTags: ['GetDevices'],
    }),
    getDeviceById: builder.query<IGetDeviceByIdResponse, string>({
      query: id => `/devices/${id}`,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setDeviceFromAPIAction(data));
      },
    }),
    postDevice: builder.mutation<IPostDeviceResponse, IPostDevicePayload>({
      query: device => ({
        url: '/devices',
        method: 'POST',
        body: device,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const {
          data: { hdd_capacity: hdd, system_name: system, type },
        } = await queryFulfilled;
        dispatch(closeModalAction());
        dispatch(setSelectedDeviceAction(null));
        toast('Successfully created new device.', {
          description: `Device: ${system}, Type: ${toCapitalize(type)} workstation, HDD Capacity: ${hdd} GB`,
        });
      },
      invalidatesTags: ['GetDevices'],
    }),
    putDevice: builder.mutation<IPutDeviceResponse, IPutDevicePayload>({
      query: device => ({
        url: `/devices/${device.id}`,
        method: 'PUT',
        body: device,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { hdd_capacity: hdd, system_name: system, type } = args;
        await queryFulfilled;
        dispatch(setDeviceFromAPIAction(undefined));
        dispatch(setSelectedDeviceAction(null));
        dispatch(closeModalAction());
        toast('Successfully updated the device.', {
          description: `Device: ${system}, Type: ${toCapitalize(type)} workstation, HDD Capacity: ${hdd} GB`,
        });
      },
      invalidatesTags: ['GetDevices'],
    }),
    deleteDevice: builder.mutation<void, string>({
      query: id => ({
        url: `/devices/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(setSelectedDeviceAction(null));
        dispatch(closeModalAction());
        toast('Device deleted successfully.');
      },
      invalidatesTags: ['GetDevices'],
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useLazyGetDeviceByIdQuery,
  usePostDeviceMutation,
  usePutDeviceMutation,
  useDeleteDeviceMutation,
} = devicesApi;
