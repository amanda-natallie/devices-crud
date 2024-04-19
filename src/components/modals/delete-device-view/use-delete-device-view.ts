import { ModalWrapperProps } from 'components/modals/modal-wrapper/modal-wrapper';

import { useModalActions } from 'hooks';

const useDeleteDeviceView = () => {
  const { closeModal } = useModalActions();
  const actions: ModalWrapperProps['actions'] = {
    primary: {
      onClick: () => closeModal(),
    },
    secondary: {
      label: 'Delete',
      onClick: () => closeModal(),
      variant: 'destructive',
    },
  };

  return {
    actions,
  };
};

export default useDeleteDeviceView;
