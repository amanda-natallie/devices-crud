import ModalWrapper from 'components/modals/modal-wrapper/modal-wrapper';

import useAddEditDeviceView from './use-add-edit-device-view';

function AddEditDeviceView() {
  const { actions } = useAddEditDeviceView();
  return (
    <ModalWrapper actions={actions} title="Add/Edit Device">
      <div className="space-y-4">
        <p className="block text-sm font-medium text-gray-700">Device Name</p>
      </div>
    </ModalWrapper>
  );
}

export default AddEditDeviceView;
