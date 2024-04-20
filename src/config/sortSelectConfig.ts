import { SortSelect } from 'domains/devices';

export const sortSelectConfig: SortSelect[] = [
  {
    id: 'hdd-asc',
    label: 'HDD Capacity (Ascending)',
    sortBy: 'ASC',
    device: 'hdd_capacity',
  },
  {
    id: 'hdd-desc',
    label: 'HDD Capacity (Descending)',
    sortBy: 'DESC',
    device: 'hdd_capacity',
  },
  {
    id: 'name-asc',
    label: 'Name (Ascending)',
    sortBy: 'ASC',
    device: 'system_name',
  },
  {
    id: 'name-desc',
    label: 'Name (Descending)',
    sortBy: 'DESC',
    device: 'system_name',
  },
];
