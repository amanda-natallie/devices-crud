import { CSSProperties } from 'react';

import { IDevice } from 'types';

import { ActionsMenu } from 'components/containers/devices/components/actions-menu/actions-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import Icon, { iconType } from 'components/ui/icon';

import { toCapitalize } from 'utils/common';

interface DeviceItemProps extends IDevice {
  style: CSSProperties;
}

function DeviceItem({ hdd_capacity: hdd, id, system_name: system, type, style }: DeviceItemProps) {
  const iconName = type.toLowerCase() as keyof typeof iconType;
  return (
    <Card className="group" key={id} data-testid={`device-item-${system}`} style={style}>
      <CardHeader>
        <CardTitle>
          <Icon name={iconName} color="#595766" />
          {system}
        </CardTitle>
        <CardDescription>
          {toCapitalize(type)} workstation - {hdd} GB
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ActionsMenu {...{ id }} />
      </CardContent>
    </Card>
  );
}

export default DeviceItem;
