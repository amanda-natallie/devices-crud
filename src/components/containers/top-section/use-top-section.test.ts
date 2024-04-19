import { act, renderHook } from 'utils/test';

import useTopSection from './use-top-section';

describe('useTopSection', () => {
  it('should handle modal open state', () => {
    const { result } = renderHook(() => useTopSection());

    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.handleOpenModal();
    });

    expect(result.current.isModalOpen).toBe(true);
  });
});
