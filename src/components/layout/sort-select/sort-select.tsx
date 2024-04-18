import { sortSelectConfig } from 'config/sortSelectConfig';

import { Button } from 'components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu/dropdown-menu';
import Icon from 'components/ui/icon/icon';

import useSortSelect from './use-sort-select';

export function SortSelect() {
  const { setSort, value } = useSortSelect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-md font-light flex justify-between gap-4">
          Sort By: {value.label}
          <Icon name="chevronDown" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={value.id} onValueChange={setSort}>
          {sortSelectConfig.map(props => (
            <DropdownMenuRadioItem key={props.id} value={props.id}>
              {props.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
