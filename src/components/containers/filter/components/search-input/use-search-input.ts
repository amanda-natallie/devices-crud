import { ChangeEvent, useState } from 'react';

const useSearchInput = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return {
    search,
    handleSearch,
  };
};

export default useSearchInput;
