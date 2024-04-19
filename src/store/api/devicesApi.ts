import { toast } from 'sonner';
import { setDevices, setSelectedDevice } from 'store/slices';
import { closeModal } from 'store/slices/modalsSlice';
import {
  IGetDeviceByIdResponse,
  IGetDevicesResponse,
  IPostDevicePayload,
  IPostDeviceResponse,
  IPutDevicePayload,
  IPutDeviceResponse,
} from 'store/types';

import { publicAPI } from './api';

export const devicesApi = publicAPI.injectEndpoints({
  endpoints: builder => ({
    getDevices: builder.query<IGetDevicesResponse, void>({
      query: () => '/devices',
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setDevices(data));
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
        dispatch(closeModal());
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
        dispatch(setSelectedDevice(null));
        dispatch(closeModal());
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
        dispatch(setSelectedDevice(null));
        dispatch(closeModal());
        toast('Device deleted successfully.');
      },
      invalidatesTags: ['GetDevices'],
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useGetDeviceByIdQuery,
  usePostDeviceMutation,
  usePutDeviceMutation,
  useDeleteDeviceMutation,
} = devicesApi;
