export const mergeFlags = (defaults, overrides = {}) => {
  const result = { ...defaults };

  for (const key in overrides) {
    if (key in defaults) {
      result[key] = overrides[key];
    }
  }

  return result;
};

export const extractOverrides = (flags, defaults) => {
  return Object.keys(flags).reduce((acc, key) => {
    if (flags[key] !== defaults[key]) {
      acc[key] = flags[key];
    }
    return acc;
  }, {});
};

export const shallowEqualFlags = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => a[key] === b[key]);
};
