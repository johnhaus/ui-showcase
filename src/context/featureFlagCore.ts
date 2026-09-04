export type BooleanFlags = Record<string, boolean>;

export const mergeFlags = <T extends BooleanFlags>(
  defaults: T,
  overrides: Record<string, unknown> = {}
): T => {
  const result = { ...defaults };

  for (const key of Object.keys(defaults)) {
    if (key in overrides && typeof overrides[key] === 'boolean') {
      result[key] = overrides[key];
    }
  }

  return result;
};

export const extractOverrides = <T extends BooleanFlags>(
  flags: T,
  defaults: T
): Partial<T> => {
  const overrides: Partial<T> = {};

  for (const key of Object.keys(defaults) as Array<keyof T>) {
    if (flags[key] !== defaults[key]) {
      overrides[key] = flags[key];
    }
  }

  return overrides;
};

export const shallowEqualFlags = <T extends BooleanFlags>(
  a: T,
  b: T
): boolean => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key) => a[key] === b[key]);
};
