import { act, renderHook } from 'utils/test';

import useActionsMenu from './use-actions-menu';

describe('useActionsMenu', () => {
  it('should handle edit modal open state', () => {
    const { result } = renderHook(() => useActionsMenu());
    act(() => {
      result.current.openEditModal('test');
    });
  });

  it('should handle delete modal open state', () => {
    const { result } = renderHook(() => useActionsMenu());

    act(() => {
      result.current.openDeleteModal('test');
    });
  });
});
