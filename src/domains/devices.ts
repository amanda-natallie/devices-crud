import { ReactNode } from 'react';

import { DeviceType, OrderByType, OrderResultType } from 'store/types';

export interface DeviceTypeSelect {
  id: DeviceType;
  label: string;
  icon: ReactNode;
}

export type SortSelect = Omit<DeviceTypeSelect, 'icon' | 'id'> & {
  id: string;
  device: OrderResultType;
  sortBy: OrderByType;
};
