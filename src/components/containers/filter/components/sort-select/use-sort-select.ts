import { useEffect, useState } from 'react';

import { sortSelectConfig } from 'config/sortSelectConfig';
import { useAppSelector } from 'store';
import { SortSelect as SortSelectType } from 'types';

import { useDevicesActions } from 'hooks';

const useSortSelect = () => {
  const { orderBy, orderResultBy } = useAppSelector(state => state.devicesState);
  const { setOrderBy, setOrderByResult } = useDevicesActions();
  const [value, setValue] = useState<SortSelectType>(sortSelectConfig[0]);

  const setSort = (props: string) => {
    const sorted = sortSelectConfig.find(sort => sort.id === props) as SortSelectType;

    setValue(sorted);
    setOrderBy(sorted.sortBy);
    setOrderByResult(sorted.device);
  };

  useEffect(() => {
    if (orderBy === 'ASC' && orderResultBy === 'hdd_capacity') {
      setValue(sortSelectConfig[0]);
    }
  }, [orderBy, orderResultBy]);

  return {
    value,
    setSort,
  };
};

export default useSortSelect;
