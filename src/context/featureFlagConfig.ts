import defaultFlagsJson from '../config/featureFlags.json';

export const defaultFlags = Object.freeze(defaultFlagsJson);

export type FeatureFlag = keyof typeof defaultFlags;
export type FeatureFlags = typeof defaultFlags;
