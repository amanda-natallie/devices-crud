import ModalWrapper from 'components/modals/modal-wrapper/modal-wrapper';

import useDeleteDeviceView from './use-delete-device-view';

function DeleteDeviceView() {
  const { actions } = useDeleteDeviceView();
  return (
    <ModalWrapper actions={actions} title="Delete device?">
      <div className="space-y-4">
        <p className="block text-sm font-medium text-gray-700">
          You are about to delete the device DESKTOP-0VCBIFF. This action cannot be undone.
        </p>
      </div>
    </ModalWrapper>
  );
}

export default DeleteDeviceView;
