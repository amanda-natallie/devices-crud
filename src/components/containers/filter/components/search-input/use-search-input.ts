import { ChangeEvent, useEffect, useRef } from 'react';

import { useAppSelector } from 'store';

import { useDevicesActions } from 'hooks';

import { debounce } from 'utils/common';

const DELAY = 500;

const useSearchInput = () => {
  const { setSearchValue, setPreDebounceSearchValue } = useDevicesActions();
  const { preDebounceSearchValue } = useAppSelector(state => state.devicesState);

  const debouncedUpdateRef = useRef<ReturnType<typeof debounce> | null>(null);

  if (!debouncedUpdateRef.current) {
    debouncedUpdateRef.current = debounce((searchQuery: string) => {
      setSearchValue(searchQuery);
    }, DELAY);
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPreDebounceSearchValue(value);
    debouncedUpdateRef.current?.(value);
  };

  useEffect(
    () => () => {
      debouncedUpdateRef.current?.cancel();
    },
    [],
  );

  return {
    query: preDebounceSearchValue,
    handleSearch,
  };
};

export default useSearchInput;
