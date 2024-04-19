import { ModalWrapperProps } from 'components/modals/modal-wrapper/modal-wrapper';

import { useModalActions } from 'hooks';

const useAddEditDeviceView = () => {
  const { closeModal } = useModalActions();
  const actions: ModalWrapperProps['actions'] = {
    primary: {
      onClick: () => closeModal(),
      className: 'text-primary hover:text-primary/80',
    },
    secondary: {
      label: 'Submit',
      onClick: () => closeModal(),
    },
  };

  return {
    actions,
  };
};

export default useAddEditDeviceView;
