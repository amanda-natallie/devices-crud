import { IDevice } from 'types';

export type SortStrategy = (orderBy: 'ASC' | 'DESC') => (a: IDevice, b: IDevice) => number;

export const sortStrategies: Record<string, SortStrategy> = {
  system_name: orderBy => (a, b) =>
    orderBy === 'ASC'
      ? a.system_name.localeCompare(b.system_name)
      : b.system_name.localeCompare(a.system_name),
  hdd_capacity: orderBy => (a, b) => {
    const numA = Number(a.hdd_capacity);
    const numB = Number(b.hdd_capacity);
    return orderBy === 'ASC' ? numA - numB : numB - numA;
  },
};

export const getSortStrategy = (
  orderResultBy: keyof typeof sortStrategies,
  orderBy: 'ASC' | 'DESC',
): ((a: IDevice, b: IDevice) => number) | null => {
  const strategy = sortStrategies[orderResultBy];
  return strategy ? strategy(orderBy) : null;
};
