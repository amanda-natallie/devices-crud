import { toast } from 'sonner';
import { setDevicesAction, setSelectedDeviceAction } from 'store/slices';
import { closeModalAction } from 'store/slices/modalsSlice';
import {
  IGetDeviceByIdResponse,
  IGetDevicesResponse,
  IPostDevicePayload,
  IPostDeviceResponse,
  IPutDevicePayload,
  IPutDeviceResponse,
} from 'types';

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
        toast('Successfully created new device.', {
          description: `Device: ${system}, Type: ${type}, HDD Capacity: ${hdd}`,
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
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(setSelectedDeviceAction(null));
        dispatch(closeModalAction());
        toast('Device updated successfully.');
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
