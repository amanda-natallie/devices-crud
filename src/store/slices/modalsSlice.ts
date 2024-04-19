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
    resetModalsInfoAction: () => initialState,
    setModalViewAction: (state, action: PayloadAction<keyof typeof MODAL_VIEWS_TYPE>) => {
      state.modalView = action.payload;
    },
    openModalAction: state => {
      state.displayModal = true;
    },
    closeModalAction: state => {
      state.displayModal = false;
    },
  },
});

export default modalsSlice.reducer;

export const { resetModalsInfoAction, openModalAction, closeModalAction, setModalViewAction } =
  modalsSlice.actions;
