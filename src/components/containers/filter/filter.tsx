import { DeviceTypeSelect, ResetFilterButton, SearchInput, SortSelect } from './components';

function Filter() {
  return (
    <div className="flex gap-4 flex-wrap " data-testid="filter-wrapper">
      <SearchInput />
      <div className="flex gap-4 flex-wrap w-full lg:w-auto max-[1024px]:order-3 lg:order-2">
        <DeviceTypeSelect />
        <SortSelect />
      </div>
      <ResetFilterButton />
    </div>
  );
}

export default Filter;
