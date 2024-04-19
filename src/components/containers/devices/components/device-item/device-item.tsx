import { ActionsMenu } from 'components/containers/devices/components/actions-menu/actions-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card/card';
import Icon from 'components/ui/icon/icon';

function DeviceItem() {
  return (
    <Card className="group">
      <CardHeader>
        <CardTitle>
          <Icon name="windows" color="#595766" />
          DESKTOP-0VCBIFF
        </CardTitle>
        <CardDescription>Windows workstation - 128 GB</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ActionsMenu />
      </CardContent>
    </Card>
  );
}

export default DeviceItem;
