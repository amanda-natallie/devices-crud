import { Button } from 'components/ui/button';
import Icon from 'components/ui/icon/icon';

function TopSection() {
  return (
    <div className="flex justify-between my-9" data-testid="top-section-wrapper">
      <h1 className="font-medium text-xl">Devices</h1>
      <Button>
        <Icon name="plus" className="mr-2" color="#ffffff" />
        Add Device
      </Button>
    </div>
  );
}

export default TopSection;
