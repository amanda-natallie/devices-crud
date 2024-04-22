import { useAppDispatch } from 'store';
import {
  resetDevicesInfoAction,
  setDeviceFromAPIAction,
  setDeviceTypesAction,
  setOrderByAction,
  setOrderByResultAction,
  setPreDebounceSearchValueAction,
  setSearchValueAction,
  setSelectedDeviceAction,
} from 'store/slices/devicesSlice';
import { DeviceType, IDevice, OrderByType, OrderResultType } from 'types';

const useDevicesActions = () => {
  const dispatch = useAppDispatch();

  const resetDevicesInfo = () => {
    dispatch(resetDevicesInfoAction());
  };

  const setSelectedDevice = (payload: string | null) => {
    dispatch(setSelectedDeviceAction(payload));
  };

  const setDeviceFromAPI = (payload: IDevice | undefined) => {
    dispatch(setDeviceFromAPIAction(payload));
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
  const setPreDebounceSearchValue = (payload: string) => {
    dispatch(setPreDebounceSearchValueAction(payload));
  };

  return {
    resetDevicesInfo,
    setSelectedDevice,
    setOrderBy,
    setOrderByResult,
    setDeviceTypes,
    setSearchValue,
    setPreDebounceSearchValue,
    setDeviceFromAPI,
  };
};

export default useDevicesActions;
