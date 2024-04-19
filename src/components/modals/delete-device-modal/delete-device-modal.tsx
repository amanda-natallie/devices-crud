import { SetStateAction } from 'react';

import ModalWrapper from 'components/modals/modal-wrapper';

import useDeleteDeviceModal from './use-delete-device-modal';

type DeleteDeviceModalProps = {
  isOpen: boolean;
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
};

function DeleteDeviceModal({ isOpen, setIsModalOpen }: DeleteDeviceModalProps) {
  const { actions, isModalOpen, toggleModal } = useDeleteDeviceModal(isOpen, setIsModalOpen);
  return (
    <ModalWrapper
      actions={actions}
      open={isModalOpen}
      onOpenChange={toggleModal}
      title="Delete device?"
    >
      <div className="space-y-4">
        <p className="block text-sm font-medium text-gray-700">
          You are about to delete the device DESKTOP-0VCBIFF. This action cannot be undone.
        </p>
      </div>
    </ModalWrapper>
  );
}

export default DeleteDeviceModal;
