import { Button } from 'components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog/dialog';

import { DeleteModalSkeleton } from './skeleton';
import useDeleteDeviceView from './use-delete-device-view';

function DeleteDeviceView() {
  const { actions, deviceName, isLoading } = useDeleteDeviceView();
  const { primary, secondary } = actions;

  return (
    <DialogContent className="sm:max-w-[540px]">
      {isLoading ? (
        <DeleteModalSkeleton />
      ) : (
        <>
          <DialogHeader>
            <DialogTitle>Delete device?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="block text-sm font-medium text-gray-700">
              You are about to delete the device {deviceName}. This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={primary.onClick}>
              Cancel
            </Button>
            <Button type="submit" onClick={secondary.onClick} variant="destructive">
              {secondary.label}
            </Button>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
}

export default DeleteDeviceView;
