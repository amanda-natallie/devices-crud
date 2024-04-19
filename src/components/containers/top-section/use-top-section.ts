import { MODAL_VIEWS_TYPE } from 'store/types';

import { useModalActions } from 'hooks';

const useTopSection = () => {
  const { setModalView } = useModalActions();
  const handleOpenModal = () => {
    setModalView(MODAL_VIEWS_TYPE.ADD_EDIT_DEVICE_VIEW);
  };
  return {
    handleOpenModal,
  };
};

export default useTopSection;
