import { MODAL_VIEWS_TYPE } from 'store/types';

import { useDevicesActions, useModalActions } from 'hooks';

const useActionsMenu = () => {
  const { setModalView } = useModalActions();
  const { setSelectedDevice } = useDevicesActions();

  const handleSelectedDevice = (id: string) => {
    setSelectedDevice(id);
  };

  const openEditModal = (id: string) => {
    handleSelectedDevice(id);
    setModalView(MODAL_VIEWS_TYPE.ADD_EDIT_DEVICE_VIEW);
  };

  const openDeleteModal = (id: string) => {
    handleSelectedDevice(id);
    setModalView(MODAL_VIEWS_TYPE.DELETE_DEVICE_VIEW);
  };
  return {
    openEditModal,
    openDeleteModal,
  };
};

export default useActionsMenu;
