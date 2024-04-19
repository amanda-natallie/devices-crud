import { SetStateAction } from 'react';

import { ModalWrapperProps } from 'components/modals/modal-wrapper';

const useDeleteDeviceModal = (
  isModalOpen: boolean,
  setIsModalOpen: (value: SetStateAction<boolean>) => void,
) => {
  const actions: ModalWrapperProps['actions'] = {
    primary: {
      onClick: () => {
        setIsModalOpen(false);
      },
      className: 'text-primary hover:text-primary/80',
    },
    secondary: {
      label: 'Submit',
      onClick: () => {
        setIsModalOpen(false);
      },
    },
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    actions,
    isModalOpen,
    toggleModal,
  };
};

export default useDeleteDeviceModal;
