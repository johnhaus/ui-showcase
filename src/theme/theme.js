import palette from './palette';

export const darkTheme = {
  colors: {
    background: {
      canvas: palette.black,
      surface: palette.white,
      fixedLight: palette.white,
    },
    text: {
      onCanvas: palette.white,
      onSurface: palette.black,
      fixedLight: palette.white,
      fixedDark: palette.black,
    },
    action: {
      hover: palette.white91,
      hoverFixed: palette.white91,
      hoverSubtleFixed: palette.white10,
    },
    // Button colors and error/success messaging
    intent: {
      destructive: palette.red900,
      warning: palette.orange600,
      success: palette.green700,
    },
    surface: {
      highlight: palette.green100,
    },
    accent: {
      primary: palette.red900,
    },
    border: {
      strong: palette.black,
      inverseStrong: palette.white,
      subtle: palette.black10,
    },
    // Box-shadow colors
    emphasis: {
      high: palette.white,
    },
    // Focus colors
    focus: {
      ring: palette.black,
    },
    control: {
      background: palette.white,
    },
  },
};

export const lightTheme = {
  colors: {
    background: {
      canvas: palette.white,
      surface: palette.black,
      fixedLight: palette.white,
    },
    text: {
      onCanvas: palette.black,
      onSurface: palette.white,
      fixedLight: palette.white,
      fixedDark: palette.black,
    },
    action: {
      hover: palette.black91,
      hoverFixed: palette.white91,
      hoverSubtleFixed: palette.white10,
    },
    intent: {
      destructive: palette.red300,
      warning: palette.orange600,
      success: palette.green700,
    },
    surface: {
      highlight: palette.green100,
    },
    accent: {
      primary: palette.red900,
    },
    border: {
      strong: palette.white,
      inverseStrong: palette.black,
      subtle: palette.black10,
    },
    emphasis: {
      high: palette.black,
    },
    focus: {
      ring: palette.white,
    },
    control: {
      background: palette.white,
    },
  },
};
