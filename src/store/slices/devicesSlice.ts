import { DevicesState, DeviceType, IDevice, OrderByType, OrderResultType } from 'store/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DevicesState = {
  devices: [],
  filteredDevices: [],
  selectedDevice: null,
  orderBy: 'ASC',
  orderResultBy: 'system_name',
  deviceTypes: [],
};

export const devicesSlice = createSlice({
  initialState,
  name: 'devicesSlice',
  reducers: {
    resetDevicesInfoAction: state => ({
      ...initialState,
      devices: state.devices,
      filteredDevices: state.devices,
    }),
    setDevicesAction: (state, action: PayloadAction<IDevice[]>) => {
      state.devices = action.payload;
    },
    setFilteredDevicesAction: (state, action: PayloadAction<IDevice[]>) => {
      state.filteredDevices = action.payload;
    },
    setSelectedDeviceAction: (state, action: PayloadAction<string | null>) => {
      state.selectedDevice = action.payload;
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
  },
});

export default devicesSlice.reducer;

export const {
  resetDevicesInfoAction,
  setDeviceTypesAction,
  setDevicesAction,
  setFilteredDevicesAction,
  setSelectedDeviceAction,
  setOrderByAction,
  setOrderByResultAction,
} = devicesSlice.actions;
