import { Input } from 'components/ui/input';

import useSearchInput from './use-search-input';

export function SearchInput() {
  const { handleSearch, query } = useSearchInput();

  return (
    <div
      className="flex flex-col w-full lg:w-[270px] order-1 max-[1024px]:max-w-[calc(100%-50px)]"
      data-testid="search-input-wrapper"
    >
      <Input
        icon="search"
        onChange={handleSearch}
        value={query}
        placeholder="Search"
        id="search-devices"
      />
    </div>
  );
}
