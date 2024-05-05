import { ChangeEvent, useEffect, useRef } from 'react';

import { useAppSelector } from 'store';

import { useDevicesActions } from 'hooks';

import { debounce } from 'utils/common';

const DELAY = 500; // 500 milliseconds

const useSearchInput = () => {
  const { setSearchValue, setPreDebounceSearchValue } = useDevicesActions();
  const { preDebounceSearchValue } = useAppSelector(state => state.devicesState);

  const debouncedUpdateRef = useRef<(searchQuery: string) => void>();

  useEffect(() => {
    debouncedUpdateRef.current = debounce((searchQuery: string) => {
      setSearchValue(searchQuery);
    }, DELAY);

    return () => {
      debouncedUpdateRef.current = undefined;
    };
  }, [setSearchValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPreDebounceSearchValue(value);
    debouncedUpdateRef.current!(value);
  };

  return {
    query: preDebounceSearchValue,
    handleSearch,
  };
};

export default useSearchInput;
