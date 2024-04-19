import { DevicesState, IDevice } from 'store/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DevicesState = {
  devices: [],
  filteredDevices: [],
  selectedDevice: null,
  orderBy: 'system_name',
  deviceTypes: [],
};

export const devicesSlice = createSlice({
  initialState,
  name: 'devicesSlice',
  reducers: {
    resetDevicesInfo: () => initialState,
    setDevices: (state, action: PayloadAction<IDevice[]>) => {
      state.devices = action.payload;
    },
    setFilteredDevices: (state, action: PayloadAction<IDevice[]>) => {
      state.filteredDevices = action.payload;
    },
    setSelectedDevice: (state, action: PayloadAction<IDevice | null>) => {
      state.selectedDevice = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    setDeviceTypes: (state, action: PayloadAction<string[]>) => {
      state.deviceTypes = action.payload;
    },
  },
});

export default devicesSlice.reducer;

export const {
  resetDevicesInfo,
  setDeviceTypes,
  setDevices,
  setFilteredDevices,
  setSelectedDevice,
  setOrderBy,
} = devicesSlice.actions;
