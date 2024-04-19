import { SetStateAction } from 'react';

import ModalWrapper from 'components/modals/modal-wrapper';

import useAddEditDeviceModal from './use-add-edit-device-modal';

type AddEditDeviceModalProps = {
  isOpen: boolean;
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
};

function AddEditDeviceModal({ isOpen, setIsModalOpen }: AddEditDeviceModalProps) {
  const { actions, isModalOpen, toggleModal } = useAddEditDeviceModal(isOpen, setIsModalOpen);
  return (
    <ModalWrapper
      actions={actions}
      open={isModalOpen}
      onOpenChange={toggleModal}
      title="Add/Edit Device"
    >
      <div className="space-y-4">
        <p className="block text-sm font-medium text-gray-700">Device Name</p>
      </div>
    </ModalWrapper>
  );
}

export default AddEditDeviceModal;
