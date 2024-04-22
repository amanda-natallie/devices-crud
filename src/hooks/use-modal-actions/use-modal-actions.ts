import { useAppDispatch } from 'store';
import {
  openModalAction,
  resetModalsInfoAction,
  setModalViewAction,
} from 'store/slices/modalsSlice';
import { MODAL_VIEWS_TYPE } from 'types';

import useDevicesActions from 'hooks/use-devices-actions/use-devices-actions';

const useModalActions = () => {
  const { setSelectedDevice, setDeviceFromAPI } = useDevicesActions();
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(resetModalsInfoAction());
    setSelectedDevice(null);
    setDeviceFromAPI(undefined);
  };

  const openModal = () => {
    dispatch(openModalAction());
  };

  const setModalView = (payload: keyof typeof MODAL_VIEWS_TYPE) => {
    dispatch(setModalViewAction(payload));
    openModal();
  };

  return {
    closeModal,
    openModal,
    setModalView,
  };
};

export default useModalActions;
