import { useState } from 'react';

import { sortSelectConfig } from 'config/sortSelectConfig';

import { useDevicesActions } from 'hooks';

import { SortSelect as SortSelectType } from 'domains/devices';

const useSortSelect = () => {
  const { setOrderBy, setOrderByResult } = useDevicesActions();
  const [value, setValue] = useState<SortSelectType>(sortSelectConfig[0]);

  const setSort = (props: string) => {
    const sorted = sortSelectConfig.find(sort => sort.id === props) as SortSelectType;

    setValue(sorted);
    setOrderBy(sorted.sortBy);
    setOrderByResult(sorted.device);
  };

  return {
    value,
    setSort,
  };
};

export default useSortSelect;
