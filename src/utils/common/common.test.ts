import { vi } from 'vitest';

import { debounce, removeObjectKey, toCapitalize } from './common';

describe('Common Utils', () => {
  describe('removeObjectKey', () => {
    it('should remove the specified key from the object', () => {
      const inputObject = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };
      const keyToRemove = 'key2';
      const result = removeObjectKey(inputObject, keyToRemove);

      expect(result).not.toHaveProperty(keyToRemove);
      expect(result).toEqual({
        key1: 'value1',
        key3: 'value3',
      });
    });

    it('should return the same object if key does not exist', () => {
      const inputObject = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };
      const keyToRemove = 'nonexistentKey' as keyof typeof inputObject;

      const result = removeObjectKey(inputObject, keyToRemove);

      expect(result).toEqual(inputObject);
    });

    it('should handle removing the last key from the object', () => {
      const inputObject = {
        key1: 'value1',
      };
      const keyToRemove = 'key1';
      const result = removeObjectKey(inputObject, keyToRemove);

      expect(result).toEqual({});
    });

    it('should handle an empty object', () => {
      const inputObject = {};
      const keyToRemove = 'nonexistentKey' as keyof typeof inputObject;

      const result = removeObjectKey(inputObject, keyToRemove);
      expect(result).toEqual({});
    });
    it('should handle null object', () => {
      const inputObject = null;
      const keyToRemove = 'nonexistentKey' as keyof typeof inputObject;

      const result = removeObjectKey(inputObject, keyToRemove);
      expect(result).toEqual(null);
    });
  });

  describe('toCapitalize', () => {
    it('should capitalize the first letter of a string', () => {
      const inputString = 'test string';
      const result = toCapitalize(inputString);

      expect(result).toEqual('Test string');
    });

    it('should handle an empty string', () => {
      const inputString = '';
      const result = toCapitalize(inputString);

      expect(result).toEqual('');
    });
  });
});
describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  it('should debounce the callback function', () => {
    const callback = vi.fn();
    const wait = 1000;
    const debouncedCallback = debounce(callback, wait);

    debouncedCallback('test');

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait);

    expect(callback).toHaveBeenCalledWith('test');
  });

  it('should cancel the debounced callback', () => {
    const callback = vi.fn();
    const wait = 1000;
    const debouncedCallback = debounce(callback, wait);

    debouncedCallback('test');
    debouncedCallback.cancel();

    vi.advanceTimersByTime(wait);

    expect(callback).not.toHaveBeenCalled();
  });
  it('should clear the timer if the debounced function is called again', () => {
    const callback = vi.fn();
    const wait = 1000;
    const debouncedCallback = debounce(callback, wait);

    debouncedCallback('test');
    vi.advanceTimersByTime(wait / 2);
    debouncedCallback('test2');

    vi.advanceTimersByTime(wait);

    expect(callback).toHaveBeenCalledWith('test2');
  });
});
