import { SortSelect } from 'domains/devices';

export const sortSelectConfig: SortSelect[] = [
  {
    id: 'hdd-asc',
    label: 'HDD Capacity (Ascending)',
    sortBy: 'ASC',
  },
  {
    id: 'hdd-desc',
    label: 'HDD Capacity (Descending)',
    sortBy: 'DESC',
  },
  {
    id: 'name-asc',
    label: 'Name (Ascending)',
    sortBy: 'ASC',
  },
  {
    id: 'name-desc',
    label: 'Name (Descending)',
    sortBy: 'DESC',
  },
];
