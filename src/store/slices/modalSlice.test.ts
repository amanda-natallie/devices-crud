import { MODAL_VIEWS_TYPE, ModalsState } from 'types';
import { beforeEach, describe, expect, it } from 'vitest';

import modalsReducer, {
  closeModalAction,
  openModalAction,
  resetModalsInfoAction,
  setModalViewAction,
} from './modalsSlice';

describe('modalsSlice', () => {
  let initialState: ModalsState;

  beforeEach(() => {
    initialState = {
      displayModal: false,
      modalView: null,
    };
  });

  it('should return the initial state when passed an empty action', () => {
    const result = modalsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should reset to initial state on resetModalsInfoAction', () => {
    const previousState: ModalsState = { displayModal: true, modalView: 'ADD_EDIT_DEVICE_VIEW' };
    const result = modalsReducer(previousState, resetModalsInfoAction());
    expect(result).toEqual(initialState);
  });

  it('should set modal view on setModalViewAction', () => {
    const modalView: keyof typeof MODAL_VIEWS_TYPE = 'ADD_EDIT_DEVICE_VIEW';
    const result = modalsReducer(initialState, setModalViewAction(modalView));
    expect(result.modalView).toBe(modalView);
  });

  it('should set displayModal to true on openModalAction', () => {
    const result = modalsReducer(initialState, openModalAction());
    expect(result.displayModal).toBe(true);
  });

  it('should set displayModal to false on closeModalAction', () => {
    initialState.displayModal = true;

    const result = modalsReducer(initialState, closeModalAction());
    expect(result.displayModal).toBe(false);
  });
});
