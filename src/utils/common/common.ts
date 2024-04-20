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

export const toCapitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const debounce = <T extends string>(callback: (args: T) => void, wait: number) => {
  let timer: NodeJS.Timeout | null = null;

  const debounced = (args: T) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
    }
  };

  return debounced;
};
