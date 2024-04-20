import { ReactNode } from 'react';

/* Components */
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

export type IDevice = {
  id: string;
  system_name: string;
  type: string;
  hdd_capacity: number;
};

/* Constants */
export type OrderByType = 'ASC' | 'DESC';
export type OrderResultType = 'system_name' | 'hdd_capacity';
export type DeviceType = 'WINDOWS' | 'MAC' | 'LINUX' | 'ALL';
export const allDeviceTypes: DeviceType[] = ['LINUX', 'MAC', 'WINDOWS'];

/* API */
export type IGetDevicesResponse = IDevice[];

export type IGetDeviceByIdResponse = IDevice;

export type IPostDevicePayload = Omit<IDevice, 'id'>;

export type IPostDeviceResponse = IDevice;

export type IPutDevicePayload = IDevice;

export type IPutDeviceResponse = number;

export type DevicesState = {
  devices: IDevice[];
  selectedDevice: string | null;
  orderBy: OrderByType;
  orderResultBy: OrderResultType;
  deviceTypes: DeviceType[];
  searchValue: string;
};
