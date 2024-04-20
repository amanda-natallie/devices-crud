export type IDevice = {
  id: string;
  system_name: string;
  type: string;
  hdd_capacity: number;
};

export type IGetDevicesResponse = IDevice[];

export type IGetDeviceByIdResponse = IDevice;

export type IPostDevicePayload = Omit<IDevice, 'id'>;

export type IPostDeviceResponse = IDevice;

export type IPutDevicePayload = IDevice;

export type IPutDeviceResponse = number;

export type OrderByType = 'ASC' | 'DESC' | null;
export type OrderResultType = 'system_name' | 'hdd_capacity' | null;
export type DeviceType = 'WINDOWS' | 'MAC' | 'LINUX' | 'ALL';

export type DevicesState = {
  devices: IDevice[];
  filteredDevices: IDevice[];
  selectedDevice: string | null;
  orderBy: OrderByType;
  orderResultBy: OrderResultType;
  deviceTypes: DeviceType[];
  searchValue: string;
};

export const allDeviceTypes: DeviceType[] = ['LINUX', 'MAC', 'WINDOWS'];
