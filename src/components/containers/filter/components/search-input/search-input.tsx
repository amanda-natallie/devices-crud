import { Input } from 'components/ui/input';

import useSearchInput from './use-search-input';

export function SearchInput() {
  const { handleSearch, search } = useSearchInput();

  return (
    <div className="flex flex-col w-full lg:w-[270px]" data-testid="search-input-wrapper">
      <Input icon="search" onChange={handleSearch} value={search} placeholder="Search" />
    </div>
  );
}
