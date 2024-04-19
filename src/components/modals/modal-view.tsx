import { useAppSelector } from 'store';
import { MODAL_VIEWS_TYPE } from 'store/types';

import { Dialog } from 'components/ui/dialog/dialog';

import { useModalActions } from 'hooks';

import { AddEditDeviceView, DeleteDeviceView } from '.';

function ModalView() {
  const { modalView, displayModal } = useAppSelector(({ modalsState }) => modalsState);
  const { closeModal } = useModalActions();

  const renderModalContent = () => {
    if (!modalView) return null;
    const modalViewsMap = {
      [MODAL_VIEWS_TYPE.ADD_EDIT_DEVICE_VIEW]: <AddEditDeviceView />,
      [MODAL_VIEWS_TYPE.DELETE_DEVICE_VIEW]: <DeleteDeviceView />,
    };

    return modalViewsMap[modalView as keyof typeof MODAL_VIEWS_TYPE];
  };

  return (
    <Dialog open={displayModal} onOpenChange={closeModal}>
      {renderModalContent()}
    </Dialog>
  );
}

export default ModalView;
