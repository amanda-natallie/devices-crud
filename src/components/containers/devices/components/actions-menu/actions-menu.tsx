import { AddEditDeviceModal, DeleteDeviceModal } from 'components/modals';
import { Button } from 'components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu/dropdown-menu';
import Icon from 'components/ui/icon/icon';

import useActionsMenu from './use-actions-menu';

export function ActionsMenu() {
  const {
    isEditModalOpen,
    isDeleteModalOpen,
    openEditModal,
    openDeleteModal,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
  } = useActionsMenu();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" data-testid="options-menu-trigger">
            <Icon name="options" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={openEditModal}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive hover:text-destructive/80"
            onClick={openDeleteModal}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddEditDeviceModal isOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
      <DeleteDeviceModal isOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} />
    </>
  );
}
