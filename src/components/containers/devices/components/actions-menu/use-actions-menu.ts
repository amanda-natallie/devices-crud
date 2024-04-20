import { MODAL_VIEWS_TYPE } from 'store/types';

import { useDevicesActions, useModalActions } from 'hooks';

const useActionsMenu = (id: string) => {
  const { setModalView } = useModalActions();
  const { setSelectedDevice } = useDevicesActions();

  const handleSelectedDevice = () => {
    setSelectedDevice(id);
  };

  const openEditModal = () => {
    handleSelectedDevice();
    setModalView(MODAL_VIEWS_TYPE.ADD_EDIT_DEVICE_VIEW);
  };

  const openDeleteModal = () => {
    handleSelectedDevice();
    setModalView(MODAL_VIEWS_TYPE.DELETE_DEVICE_VIEW);
  };
  return {
    openEditModal,
    openDeleteModal,
  };
};

export default useActionsMenu;
