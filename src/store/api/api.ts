import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_REST_API_URL;
// eslint-disable-next-line no-console
console.log(import.meta.env);

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  appApi,
  extraOptions,
) => {
  const rawBaseQuery = fetchBaseQuery({ baseUrl });
  return rawBaseQuery(args, appApi, extraOptions);
};

export const publicAPI = createApi({
  reducerPath: 'publicAPI',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['GetDevices'],
});
