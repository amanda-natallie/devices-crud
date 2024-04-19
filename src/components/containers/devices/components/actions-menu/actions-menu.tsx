import { Button } from 'components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu/dropdown-menu';
import Icon from 'components/ui/icon/icon';

import useActionsMenu from './use-actions-menu';

interface ActionsMenuProps {
  id: string;
}

export function ActionsMenu({ id }: ActionsMenuProps) {
  const { openEditModal, openDeleteModal } = useActionsMenu();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" data-testid="options-menu-trigger">
          <Icon name="options" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => openEditModal(id)}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive hover:text-destructive/80"
          onClick={() => openDeleteModal(id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
