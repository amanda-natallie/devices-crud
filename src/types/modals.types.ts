import { z } from 'zod';

export interface ModalsState {
  displayModal: boolean;
  modalView: keyof typeof MODAL_VIEWS_TYPE | null;
}

export enum MODAL_VIEWS_TYPE {
  ADD_EDIT_DEVICE_VIEW = 'ADD_EDIT_DEVICE_VIEW',
  DELETE_DEVICE_VIEW = 'DELETE_DEVICE_VIEW',
}

export enum ModalActionTypes {
  openModal,
  closeModal,
  setModalView,
}

export const schema = z.object({
  id: z.string().optional(),
  system_name: z
    .string({
      required_error: 'System Name is required',
    })
    .min(3, {
      message: 'System Name must be at least 3 characters',
    }),
  type: z.string({
    required_error: 'Device Type is required',
  }),
  hdd_capacity: z
    .number({
      required_error: 'HDD Capacity is required',
      invalid_type_error: 'HDD Capacity must be a number',
    })
    .min(4, {
      message: 'HDD Capacity must be greater than 4 GB',
    }),
});

export type FormValues = z.infer<typeof schema>;
