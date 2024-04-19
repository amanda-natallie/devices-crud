import { act, renderHook } from 'utils/test';

import useTopSection from './use-top-section';

describe('useTopSection', () => {
  it('should handle modal open state', () => {
    const { result } = renderHook(() => useTopSection());

    act(() => {
      result.current.handleOpenModal();
    });
  });
});
