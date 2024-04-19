import { useAppDispatch } from 'store';
import {
  openModalAction,
  resetModalsInfoAction,
  setModalViewAction,
} from 'store/slices/modalsSlice';
import { MODAL_VIEWS_TYPE } from 'store/types';

const useModalActions = () => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(resetModalsInfoAction());
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
