import {
  mergeFlags,
  extractOverrides,
  shallowEqualFlags,
} from './featureFlagCore';

describe('mergeFlags', () => {
  it('should return merged object with overrides taking precedence over defaults', () => {
    const defaults = { flag1: true, flag2: false };
    const overrides = { flag2: true };

    const result = mergeFlags(defaults, overrides);
    expect(result).toEqual({ flag1: true, flag2: true });
  });

  it('should return defaults if overrides are empty', () => {
    const defaults = { flag1: true, flag2: false };

    const result = mergeFlags(defaults);
    expect(result).toEqual({ flag1: true, flag2: false });
  });

  it('should return empty object if defaults are empty', () => {
    const overrides = { flag1: true, flag2: false };

    const result = mergeFlags({}, overrides);
    expect(result).toEqual({});
  });

  it('should not mutate the defaults object', () => {
    const defaults = { flag1: true };
    const overrides = { flag1: false };

    const result = mergeFlags(defaults, overrides);

    expect(defaults).toEqual({ flag1: true });
    expect(result).not.toBe(defaults);
  });

  it('should ignore unknown override keys', () => {
    const defaults = { flag1: true };
    const overrides = { flag2: false };

    const result = mergeFlags(defaults, overrides);

    expect(result).toEqual({ flag1: true });
  });
});

describe('extractOverrides', () => {
  it('should return the flags that are different from defaults', () => {
    const flags = { flag1: true, flag2: true };
    const defaults = { flag1: true, flag2: false };

    const result = extractOverrides(flags, defaults);
    expect(result).toEqual({ flag2: true });
  });

  it('should return multiple overrides when multiple flags differ', () => {
    const flags = { flag1: false, flag2: true, flag3: true };
    const defaults = { flag1: true, flag2: false, flag3: true };

    const result = extractOverrides(flags, defaults);
    expect(result).toEqual({ flag1: false, flag2: true });
  });

  it('should return an empty object when no flags differ', () => {
    const flags = { flag1: true, flag2: false };
    const defaults = { flag1: true, flag2: false };

    const result = extractOverrides(flags, defaults);
    expect(result).toEqual({});
  });

  it('should return all flags when all flags differ', () => {
    const flags = { flag1: false, flag2: true, flag3: true };
    const defaults = { flag1: true, flag2: false, flag3: false };

    const result = extractOverrides(flags, defaults);
    expect(result).toEqual({ flag1: false, flag2: true, flag3: true });
  });

  it('should return an empty object if the flags object is empty', () => {
    const flags = {};
    const defaults = { flag1: true, flag2: false };

    const result = extractOverrides(flags, defaults);
    expect(result).toEqual({});
  });

  it('should return the entire flags object if defaults is empty', () => {
    const flags = { flag1: true, flag2: false };
    const defaults = {};

    const result = extractOverrides(flags, defaults);
    expect(result).toEqual({ flag1: true, flag2: false });
  });
});

describe('shallowEqualFlags', () => {
  it('should return true for equal objects', () => {
    expect(
      shallowEqualFlags({ a: true, b: false }, { a: true, b: false })
    ).toBe(true);
  });

  it('should return false for different values', () => {
    expect(shallowEqualFlags({ a: true }, { a: false })).toBe(false);
  });

  it('should return false for different keys', () => {
    expect(shallowEqualFlags({ a: true }, { a: true, b: false })).toBe(false);
  });
});
