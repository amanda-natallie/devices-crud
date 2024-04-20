import { useCallback, useMemo } from 'react';

import { useAppSelector } from 'store';
import { DeviceType } from 'types';

import { useDevicesActions } from 'hooks';

import { toCapitalize } from 'utils/common';

enum VALIDATIONS {
  NO_DEVICE = 0,
  TWO_DEVICES = 2,
  ALL_DEVICES = 3,
  ALL = 'ALL',
}

const useDeviceTypeSelect = () => {
  const { deviceTypes } = useAppSelector(state => state.devicesState);
  const { setDeviceTypes } = useDevicesActions();

  const isAll = (deviceType: DeviceType) => deviceType === VALIDATIONS.ALL;

  const isAllIncluded = useMemo(() => {
    const numDevices = deviceTypes.length;
    return numDevices === VALIDATIONS.NO_DEVICE || numDevices === VALIDATIONS.ALL_DEVICES;
  }, [deviceTypes]);

  const updateDeviceTypes = useCallback(
    (selectedDevice: DeviceType) => {
      const alreadySelected = deviceTypes.includes(selectedDevice);
      setDeviceTypes(
        !alreadySelected
          ? [...deviceTypes, selectedDevice]
          : deviceTypes.filter(deviceType => deviceType !== selectedDevice),
      );
    },
    [deviceTypes, setDeviceTypes],
  );

  const handleChangeDeviceType = useCallback(
    (_checked: boolean, selectedDevice: DeviceType) => {
      const isAllSelected = isAll(selectedDevice);
      const shouldResetFilter = deviceTypes.length === VALIDATIONS.TWO_DEVICES;
      const isThirdDevice = !isAllSelected && shouldResetFilter;

      if (isAllSelected || isThirdDevice) {
        setDeviceTypes([]);
      } else {
        updateDeviceTypes(selectedDevice);
      }
    },
    [deviceTypes.length, setDeviceTypes, updateDeviceTypes],
  );

  const checkSelected = (deviceType: DeviceType) =>
    deviceTypes.includes(deviceType) || (isAll(deviceType) && isAllIncluded);

  const getSelectedDevicesLabel = isAllIncluded
    ? 'All'
    : deviceTypes.map(deviceType => toCapitalize(deviceType)).join(', ');

  return {
    handleChangeDeviceType,
    checkSelected,
    getSelectedDevicesLabel,
    isAllIncluded,
  };
};

export default useDeviceTypeSelect;
