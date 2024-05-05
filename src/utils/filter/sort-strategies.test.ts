import { IDevice } from 'types';

import { getSortStrategy, sortStrategies } from './sort-strategies';

describe('sortStrategies', () => {
  const devices: IDevice[] = [
    { id: '1', system_name: 'Device A', type: 'WINDOWS', hdd_capacity: '250' },
    { id: '2', system_name: 'Device B', type: 'MAC', hdd_capacity: '500' },
    { id: '3', system_name: 'Device C', type: 'LINUX', hdd_capacity: '200' },
  ];

  it('should sort by system_name in ascending order', () => {
    const sorted = [...devices].sort(sortStrategies.system_name('ASC'));
    expect(sorted[0].system_name).toBe('Device A');
    expect(sorted[1].system_name).toBe('Device B');
    expect(sorted[2].system_name).toBe('Device C');
  });

  it('should sort by system_name in descending order', () => {
    const sorted = [...devices].sort(sortStrategies.system_name('DESC'));
    expect(sorted[0].system_name).toBe('Device C');
    expect(sorted[1].system_name).toBe('Device B');
    expect(sorted[2].system_name).toBe('Device A');
  });

  it('should sort by hdd_capacity in ascending order', () => {
    const sorted = [...devices].sort(sortStrategies.hdd_capacity('ASC'));
    expect(sorted[0].hdd_capacity).toBe('200');
    expect(sorted[1].hdd_capacity).toBe('250');
    expect(sorted[2].hdd_capacity).toBe('500');
  });

  it('should sort by hdd_capacity in descending order', () => {
    const sorted = [...devices].sort(sortStrategies.hdd_capacity('DESC'));
    expect(sorted[0].hdd_capacity).toBe('500');
    expect(sorted[1].hdd_capacity).toBe('250');
    expect(sorted[2].hdd_capacity).toBe('200');
  });
});

describe('getSortStrategy', () => {
  it('should return a sort strategy for system_name', () => {
    const strategy = getSortStrategy('system_name', 'ASC');
    expect(typeof strategy).toBe('function');
  });

  it('should return a sort strategy for hdd_capacity', () => {
    const strategy = getSortStrategy('hdd_capacity', 'ASC');
    expect(typeof strategy).toBe('function');
  });

  it('should return null if the orderResultBy is not recognized', () => {
    const strategy = getSortStrategy('unknown_property', 'ASC');
    expect(strategy).toBeNull();
  });
});
