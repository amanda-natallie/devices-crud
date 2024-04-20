import { sortSelectConfig } from 'config/sortSelectConfig';

import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import Icon from 'components/ui/icon';

import useSortSelect from './use-sort-select';

export function SortSelect() {
  const { setSort, value } = useSortSelect();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex-auto lg:flex-none text-sm font-light flex justify-between gap-4"
          data-testid="sort-select-wrapper"
        >
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
