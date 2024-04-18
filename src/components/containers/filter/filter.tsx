import { DeviceTypeSelect, SearchInput, SortSelect } from './components';

function Filter() {
  return (
    <div className="flex gap-4 flex-wrap" data-testid="filter-wrapper">
      <SearchInput />
      <div className="flex gap-4 flex-wrap w-full lg:w-auto">
        <DeviceTypeSelect />
        <SortSelect />
      </div>
    </div>
  );
}

export default Filter;
