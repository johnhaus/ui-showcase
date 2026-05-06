export const mergeFlags = (defaults, overrides = {}) => {
  const result = { ...defaults };

  for (const key in overrides) {
    if (key in defaults) {
      result[key] = overrides[key];
    }
  }

  return result;
};
