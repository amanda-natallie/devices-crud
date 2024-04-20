import { useAppSelector } from 'store';

import { ModalWrapperProps } from 'components/modals/modal-wrapper/modal-wrapper';

import { useModalActions } from 'hooks';

const useAddEditDeviceView = () => {
  const { selectedDevice } = useAppSelector(state => state.devicesState);
  const { closeModal } = useModalActions();

  const isEdit = !!selectedDevice;

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
    isEdit,
  };
};

export default useAddEditDeviceView;
