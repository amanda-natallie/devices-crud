import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useDevicesActions } from 'hooks';

import { debounce } from 'utils/common';

const DELAY = 500;

const useSearchInput = () => {
  const { setSearchValue } = useDevicesActions();
  const [query, setQuery] = useState('');

  const debouncedUpdateRef = useRef<ReturnType<typeof debounce> | null>(null);

  if (!debouncedUpdateRef.current) {
    debouncedUpdateRef.current = debounce((searchQuery: string) => {
      setSearchValue(searchQuery);
    }, DELAY);
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    debouncedUpdateRef.current?.(value);
  };

  useEffect(
    () => () => {
      debouncedUpdateRef.current?.cancel();
    },
    [],
  );

  return {
    query,
    handleSearch,
  };
};

export default useSearchInput;
