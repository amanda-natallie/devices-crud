import { DeviceType, DevicesState, IDevice } from 'types';
import { describe, expect, it } from 'vitest';

import devicesReducer, {
  resetDevicesInfoAction,
  setDeviceFromAPIAction,
  setDeviceTypesAction,
  setDevicesAction,
  setOrderByAction,
  setOrderByResultAction,
  setPreDebounceSearchValueAction,
  setSearchValueAction,
  setSelectedDeviceAction,
} from './devicesSlice';

const payload = { id: '1', system_name: 'Device 1', type: 'WINDOWS', hdd_capacity: '100' };
describe('devicesSlice', () => {
  let initialState: DevicesState;

  beforeEach(() => {
    initialState = {
      devices: [],
      selectedDevice: null,
      deviceFromAPI: undefined,
      orderBy: 'ASC',
      orderResultBy: 'hdd_capacity',
      deviceTypes: [],
      searchValue: '',
      preDebounceSearchValue: '',
    };
  });

  it('should return the initial state', () => {
    expect(devicesReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle resetting devices information', () => {
    const previousState: DevicesState = {
      ...initialState,
      devices: [payload],
    };

    const newState = devicesReducer(previousState, resetDevicesInfoAction());

    expect(newState).toEqual({ ...initialState, devices: previousState.devices });
  });

  it('should handle setting devices', () => {
    const newDevices: IDevice[] = [payload];

    const newState = devicesReducer(initialState, setDevicesAction(newDevices));

    expect(newState.devices).toEqual(newDevices);
  });

  it('should handle setting selected device', () => {
    const deviceId = '2';

    const newState = devicesReducer(initialState, setSelectedDeviceAction(deviceId));

    expect(newState.selectedDevice).toBe(deviceId);
  });
  it('should handle setting device from API', () => {
    const newState = devicesReducer(initialState, setDeviceFromAPIAction(payload));

    expect(newState.deviceFromAPI).toBe(payload);
  });

  it('should handle setting order by', () => {
    const newOrderBy = 'DESC';

    const newState = devicesReducer(initialState, setOrderByAction(newOrderBy));

    expect(newState.orderBy).toBe(newOrderBy);
  });

  it('should handle setting order result by', () => {
    const newOrderResultBy = 'hdd_capacity';

    const newState = devicesReducer(initialState, setOrderByResultAction(newOrderResultBy));

    expect(newState.orderResultBy).toBe(newOrderResultBy);
  });

  it('should handle setting device types', () => {
    const newDeviceTypes: DeviceType[] = ['WINDOWS', 'MAC'];

    const newState = devicesReducer(initialState, setDeviceTypesAction(newDeviceTypes));

    expect(newState.deviceTypes).toEqual(newDeviceTypes);
  });

  it('should handle setting search value', () => {
    const newSearchValue = 'New Search Value';

    const newState = devicesReducer(initialState, setSearchValueAction(newSearchValue));

    expect(newState.searchValue).toBe(newSearchValue);
  });

  it('should handle setting pre-debounce search value', () => {
    const newPreDebounceSearchValue = 'New Pre-Debounce Value';

    const newState = devicesReducer(
      initialState,
      setPreDebounceSearchValueAction(newPreDebounceSearchValue),
    );

    expect(newState.preDebounceSearchValue).toBe(newPreDebounceSearchValue);
  });
});
