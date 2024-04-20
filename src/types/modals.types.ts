export interface ModalsState {
  displayModal: boolean;
  modalView: keyof typeof MODAL_VIEWS_TYPE | null;
}

export enum MODAL_VIEWS_TYPE {
  ADD_EDIT_DEVICE_VIEW = 'ADD_EDIT_DEVICE_VIEW',
  DELETE_DEVICE_VIEW = 'DELETE_DEVICE_VIEW',
}

export enum ModalActionTypes {
  openModal,
  closeModal,
  setModalView,
}
