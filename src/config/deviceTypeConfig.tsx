import { DEVICE_TYPES, DeviceTypeSelect } from 'types';

import Icon from 'components/ui/icon';

export const deviceTypeConfig: DeviceTypeSelect[] = [
  {
    id: DEVICE_TYPES.ALL,
    label: 'All Devices',
    icon: '',
  },
  {
    id: DEVICE_TYPES.WINDOWS,
    label: 'Windows',
    icon: <Icon name="windows" />,
  },
  {
    id: DEVICE_TYPES.MAC,
    label: 'Mac',
    icon: <Icon name="mac" />,
  },
  {
    id: DEVICE_TYPES.LINUX,
    label: 'Linux',
    icon: <Icon name="linux" />,
  },
];
