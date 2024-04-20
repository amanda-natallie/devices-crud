import { DeviceTypeSelect } from 'types';

import Icon from 'components/ui/icon/icon';

export const deviceTypeConfig: DeviceTypeSelect[] = [
  {
    id: 'ALL',
    label: 'All Devices',
    icon: '',
  },
  {
    id: 'WINDOWS',
    label: 'Windows',
    icon: <Icon name="windows" />,
  },
  {
    id: 'MAC',
    label: 'Mac',
    icon: <Icon name="mac" />,
  },
  {
    id: 'LINUX',
    label: 'Linux',
    icon: <Icon name="linux" />,
  },
];
