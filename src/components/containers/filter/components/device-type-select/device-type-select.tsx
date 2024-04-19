import { deviceTypeConfig } from 'config/deviceTypeConfig';

import { Button } from 'components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu/dropdown-menu';
import Icon from 'components/ui/icon/icon';

import useDeviceTypeSelect from './use-device-type-select';

export function DeviceTypeSelect() {
  const { handleChangeDeviceType, checkSelected, getSelectedDevicesLabel } = useDeviceTypeSelect();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex-auto lg:flex-none text-sm font-light flex justify-between gap-4"
          data-testid="device-list-wrapper"
        >
          Device Type: {getSelectedDevicesLabel}
          <Icon name="chevronDown" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {deviceTypeConfig.map(({ id, label, icon }) => {
          const isChecked = checkSelected(id);
          return (
            <DropdownMenuCheckboxItem
              key={id}
              checked={isChecked}
              onCheckedChange={checked => handleChangeDeviceType(checked, id)}
              className="flex gap-2 "
            >
              {icon}
              {label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
