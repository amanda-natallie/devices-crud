import { act, renderHook } from 'utils/test';

import useActionsMenu from './use-actions-menu';

describe('useActionsMenu', () => {
  it('should handle edit modal open state', () => {
    const { result } = renderHook(() => useActionsMenu());

    expect(result.current.isEditModalOpen).toBe(false);

    act(() => {
      result.current.openEditModal();
    });

    expect(result.current.isEditModalOpen).toBe(true);

    act(() => {
      result.current.setIsEditModalOpen(false);
    });

    expect(result.current.isEditModalOpen).toBe(false);
  });

  it('should handle delete modal open state', () => {
    const { result } = renderHook(() => useActionsMenu());

    expect(result.current.isDeleteModalOpen).toBe(false);

    act(() => {
      result.current.openDeleteModal();
    });

    expect(result.current.isDeleteModalOpen).toBe(true);

    act(() => {
      result.current.setIsDeleteModalOpen(false);
    });

    expect(result.current.isDeleteModalOpen).toBe(false);
  });
});
