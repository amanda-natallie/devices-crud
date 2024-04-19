import { vi } from 'vitest';

import { act, renderHook } from 'utils/test';

import useAddEditDeviceModal from './use-add-edit-device-modal';

describe('useAddEditDeviceModal', () => {
  it('should toggle modal open state', () => {
    const setIsModalOpen = vi.fn();
    const { result } = renderHook(() => useAddEditDeviceModal(true, setIsModalOpen));

    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.toggleModal();
    });

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('should handle primary action click', () => {
    const setIsModalOpen = vi.fn();
    const { result } = renderHook(() => useAddEditDeviceModal(true, setIsModalOpen));

    act(() => {
      result.current.actions.primary.onClick();
    });

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('should handle secondary action click', () => {
    const setIsModalOpen = vi.fn();
    const { result } = renderHook(() => useAddEditDeviceModal(true, setIsModalOpen));

    act(() => {
      result.current.actions.secondary.onClick();
    });

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
