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

export type DevicesState = {
  devices: IDevice[];
  filteredDevices: IDevice[];
  selectedDevice: IDevice | null;
  orderBy: string;
  deviceTypes: string[];
};
