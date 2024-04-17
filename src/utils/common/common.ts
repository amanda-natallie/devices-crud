export const removeObjectKey = <T extends object, K extends keyof T>(
  obj: T | null,
  keyToRemove: K,
): Omit<T, K> | null => {
  if (!obj) {
    return obj;
  }
  if (Object.prototype.hasOwnProperty.call(obj, keyToRemove)) {
    const newObj: T = { ...obj };
    delete newObj[keyToRemove];
    return newObj;
  }
  return obj;
};
