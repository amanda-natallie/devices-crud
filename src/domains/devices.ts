import { ReactNode } from 'react';

export interface DeviceTypeSelect {
  id: string;
  label: string;
  icon: ReactNode;
}

export type SortSelect = Omit<DeviceTypeSelect, 'icon'> & {
  sortBy: 'ASC' | 'DESC';
};
