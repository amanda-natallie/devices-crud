import { ReactNode } from 'react';

import { DeviceType, OrderByType } from 'store/types';

export interface DeviceTypeSelect {
  id: DeviceType;
  label: string;
  icon: ReactNode;
}

export type SortSelect = Omit<DeviceTypeSelect, 'icon'> & {
  sortBy: OrderByType;
};
