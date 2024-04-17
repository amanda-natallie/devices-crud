import { removeObjectKey } from './common';

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
});
