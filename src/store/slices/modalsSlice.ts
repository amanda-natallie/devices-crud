import { MODAL_VIEWS_TYPE, ModalsState } from 'store/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalsState = {
  displayModal: false,
  modalView: null,
};

export const modalsSlice = createSlice({
  initialState,
  name: 'modalsSlice',
  reducers: {
    resetModalsInfo: () => initialState,
    setModalView: (state, action: PayloadAction<keyof MODAL_VIEWS_TYPE>) => {
      state.modalView = action.payload;
    },
    openModal: state => {
      state.displayModal = true;
    },
    closeModal: state => {
      state.displayModal = false;
    },
  },
});

export default modalsSlice.reducer;

export const { resetModalsInfo, openModal, closeModal } = modalsSlice.actions;
