import * as React from 'react';

import { deviceTypeConfig } from 'config/deviceTypeConfig';

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { Button } from 'components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu/dropdown-menu';
import Icon from 'components/ui/icon/icon';

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function DeviceTypeSelect() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex-auto lg:flex-none text-sm font-light flex justify-between gap-4"
          data-testid="device-list-wrapper"
        >
          Device Type: All
          <Icon name="chevronDown" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {deviceTypeConfig.map(({ id, label, icon }) => (
          <DropdownMenuCheckboxItem
            key={id}
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
            className="flex gap-2 "
          >
            {icon}
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
