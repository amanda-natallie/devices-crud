import { vi } from 'vitest';

import { useModalActions } from 'hooks';

import { act, renderHook } from 'utils/test';

import useTopSection from './use-top-section';

vi.mock('hooks', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useModalActions: vi.fn(),
  };
});

describe('useTopSection', () => {
  beforeEach(() => {
    vi.mocked(useModalActions).mockReturnValue({
      closeModal: vi.fn(),
      openModal: vi.fn(),
      setModalView: vi.fn(),
    });
  });
  it('should handle modal open state', () => {
    const { result } = renderHook(() => useTopSection());

    act(() => {
      result.current.handleOpenModal();
    });
  });
});
