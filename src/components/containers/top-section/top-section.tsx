import { AddEditDeviceModal } from 'components/modals';
import { Button } from 'components/ui/button';
import Icon from 'components/ui/icon/icon';

import useTopSection from './use-top-section';

function TopSection() {
  const { isModalOpen, setIsModalOpen, handleOpenModal } = useTopSection();
  return (
    <>
      <div className="flex justify-between my-9" data-testid="top-section-wrapper">
        <h1 className="font-medium text-xl">Devices</h1>
        <Button onClick={handleOpenModal}>
          <Icon name="plus" className="mr-2" color="#ffffff" />
          Add Device
        </Button>
      </div>
      <AddEditDeviceModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}

export default TopSection;
