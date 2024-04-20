import { useAppDispatch } from 'store';
import {
  resetDevicesInfoAction,
  setDeviceTypesAction,
  setOrderByAction,
  setOrderByResultAction,
  setSearchValueAction,
  setSelectedDeviceAction,
} from 'store/slices/devicesSlice';
import { DeviceType, OrderByType, OrderResultType } from 'types';

const useDevicesActions = () => {
  const dispatch = useAppDispatch();

  const resetDevicesInfo = () => {
    dispatch(resetDevicesInfoAction());
  };

  const setSelectedDevice = (payload: string | null) => {
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
    setSelectedDevice,
    setOrderBy,
    setOrderByResult,
    setDeviceTypes,
    setSearchValue,
  };
};

export default useDevicesActions;
