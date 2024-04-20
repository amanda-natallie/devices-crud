import { useAppDispatch } from 'store';
import {
  openModalAction,
  resetModalsInfoAction,
  setModalViewAction,
} from 'store/slices/modalsSlice';
import { test, vi } from 'vitest';

import useModalActions from './use-modal-actions';

vi.mock('store');
vi.mock('hooks/use-devices-actions/use-devices-actions', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    setSelectedDevice: vi.fn(),
  };
});

vi.mock('hooks', async importOriginal => {
  const actual = (await importOriginal()) as typeof importOriginal;
  return {
    ...actual,
    useModalActions: vi.fn(),
  };
});

test('useModalActions', () => {
  beforeEach(() => {
    vi.mocked(useModalActions).mockReturnValue({
      closeModal: vi.fn(),
      openModal: vi.fn(),
      setModalView: vi.fn(),
    });

    vi.mock('useDevicesActions', () => ({
      default: () => ({ setSelectedDevice: vi.fn() }),
    }));
  });

  const dispatch = vi.fn();
  vi.mocked(useAppDispatch).mockReturnValue(dispatch);

  const { closeModal, openModal, setModalView } = useModalActions();

  closeModal();
  openModal();
  setModalView('DELETE_DEVICE_VIEW');

  expect(dispatch).toHaveBeenCalledWith(resetModalsInfoAction());
  expect(dispatch).toHaveBeenCalledWith(openModalAction());
  expect(dispatch).toHaveBeenCalledWith(setModalViewAction('DELETE_DEVICE_VIEW'));
});
