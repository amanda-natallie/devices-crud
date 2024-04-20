import { useAppDispatch } from 'store';
import {
  resetDevicesInfoAction,
  setDeviceTypesAction,
  setFilteredDevicesAction,
  setOrderByAction,
  setOrderByResultAction,
  setSearchValueAction,
  setSelectedDeviceAction,
} from 'store/slices/devicesSlice';
import { DeviceType, IDevice, OrderByType, OrderResultType } from 'store/types';

const useDevicesActions = () => {
  const dispatch = useAppDispatch();

  const resetDevicesInfo = () => {
    dispatch(resetDevicesInfoAction());
  };

  const setFilteredDevices = (payload: IDevice[]) => {
    dispatch(setFilteredDevicesAction(payload));
  };

  const setSelectedDevice = (payload: string) => {
    dispatch(setSelectedDeviceAction(payload));
  };

  const setOrderBy = (payload: OrderByType) => {
    dispatch(setOrderByAction(payload));
  };

  const setOrderByResult = (payload: OrderResultType) => {
    dispatch(setOrderByResultAction(payload));
  };

  const setDeviceTypes = (payload: DeviceType[]) => {
    dispatch(setDeviceTypesAction(payload));
  };

  const setSearchValue = (payload: string) => {
    dispatch(setSearchValueAction(payload));
  };

  return {
    resetDevicesInfo,
    setFilteredDevices,
    setSelectedDevice,
    setOrderBy,
    setOrderByResult,
    setDeviceTypes,
    setSearchValue,
  };
};

export default useDevicesActions;
