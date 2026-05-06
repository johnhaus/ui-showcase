import { mergeFlags } from './featureFlagCore';

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

  it('should ignore unknown override keys', () => {
    const defaults = { flag1: true };
    const overrides = { flag2: false };

    const result = mergeFlags(defaults, overrides);

    expect(result).toEqual({ flag1: true });
  });
});
