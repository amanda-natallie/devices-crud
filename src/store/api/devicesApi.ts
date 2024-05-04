import { setDeviceFromAPIAction, setDevicesAction } from 'store/slices';
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
      invalidatesTags: ['GetDevices'],
    }),
    putDevice: builder.mutation<IPutDeviceResponse, IPutDevicePayload>({
      query: device => ({
        url: `/devices/${device.id}`,
        method: 'PUT',
        body: device,
      }),
      invalidatesTags: ['GetDevices'],
    }),
    deleteDevice: builder.mutation<void, string>({
      query: id => ({
        url: `/devices/${id}`,
        method: 'DELETE',
      }),
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
