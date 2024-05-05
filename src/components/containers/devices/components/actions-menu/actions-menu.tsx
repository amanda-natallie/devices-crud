import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import Icon from 'components/ui/icon';

import useActionsMenu from './use-actions-menu';

interface ActionsMenuProps {
  id: string;
}

export function ActionsMenu({ id }: ActionsMenuProps) {
  const { openEditModal, openDeleteModal } = useActionsMenu(id);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          data-testid="options-menu-trigger"
          aria-label={`actions-menu-for-${id}`}
        >
          <Icon name="options" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => openEditModal()}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive hover:text-destructive/80"
          onClick={() => openDeleteModal()}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
