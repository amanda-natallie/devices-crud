import { vi } from 'vitest';

import { act, renderHook } from 'utils/test';

import useDeleteDeviceModal from './use-delete-device-modal';

describe('useDeleteDeviceModal', () => {
  it('should toggle modal open state', () => {
    const setIsModalOpen = vi.fn();
    const { result } = renderHook(() => useDeleteDeviceModal(true, setIsModalOpen));

    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.toggleModal();
    });

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('should handle primary action click', () => {
    const setIsModalOpen = vi.fn();
    const { result } = renderHook(() => useDeleteDeviceModal(true, setIsModalOpen));

    act(() => {
      result.current.actions.primary.onClick();
    });

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('should handle secondary action click', () => {
    const setIsModalOpen = vi.fn();
    const { result } = renderHook(() => useDeleteDeviceModal(true, setIsModalOpen));

    act(() => {
      result.current.actions.secondary.onClick();
    });

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
  });
});
