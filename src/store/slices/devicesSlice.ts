import { DevicesState, DeviceType, IDevice, OrderByType, OrderResultType } from 'types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DevicesState = {
  devices: [],
  selectedDevice: null,
  deviceFromAPI: undefined,
  orderBy: 'ASC',
  orderResultBy: 'hdd_capacity',
  deviceTypes: [],
  searchValue: '',
  preDebounceSearchValue: '',
};

export const devicesSlice = createSlice({
  initialState,
  name: 'devicesSlice',
  reducers: {
    resetDevicesInfoAction: state => ({
      ...initialState,
      devices: state.devices,
    }),
    setDevicesAction: (state, action: PayloadAction<IDevice[]>) => {
      state.devices = action.payload;
    },
    setSelectedDeviceAction: (state, action: PayloadAction<string | null>) => {
      state.selectedDevice = action.payload;
    },
    setDeviceFromAPIAction: (state, action: PayloadAction<IDevice | undefined>) => {
      state.deviceFromAPI = action.payload;
    },
    setOrderByAction: (state, action: PayloadAction<OrderByType>) => {
      state.orderBy = action.payload;
    },
    setOrderByResultAction: (state, action: PayloadAction<OrderResultType>) => {
      state.orderResultBy = action.payload;
    },
    setDeviceTypesAction: (state, action: PayloadAction<DeviceType[]>) => {
      state.deviceTypes = action.payload;
    },
    setSearchValueAction: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setPreDebounceSearchValueAction: (state, action: PayloadAction<string>) => {
      state.preDebounceSearchValue = action.payload;
    },
  },
});

export default devicesSlice.reducer;

export const {
  resetDevicesInfoAction,
  setDeviceTypesAction,
  setDevicesAction,
  setSelectedDeviceAction,
  setOrderByAction,
  setOrderByResultAction,
  setSearchValueAction,
  setPreDebounceSearchValueAction,
  setDeviceFromAPIAction,
} = devicesSlice.actions;
