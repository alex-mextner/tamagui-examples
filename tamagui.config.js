const { createTamagui, createFont, createTokens } = require('tamagui');

const headingFont = createFont({
  family: 'Arial, sans-serif',
});

const bodyFont = createFont({
  family: 'Arial, sans-serif',
});

const tokens = createTokens({
  font: {
    heading: headingFont,
    body: bodyFont,
  },
  color: {
    white: '#fff',
    black: '#000',
    blue: '#0070f3',
    blueDark: '#0051cc',
    gray: '#888',
    grayDark: '#333',
  },
  size: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  space: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
});

const tamaguiConfig = createTamagui({
  tokens,
  themes: {
    light: {
      bg: tokens.color.white,
      color: tokens.color.black,
      borderColor: tokens.color.gray,
    },
    dark: {
      bg: tokens.color.black,
      color: tokens.color.white,
      borderColor: tokens.color.grayDark,
    },
  },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  media: {
    sm: { maxWidth: 660 },
    md: { maxWidth: 880 },
    lg: { maxWidth: 1120 },
    xl: { maxWidth: 1320 },
    xxl: { maxWidth: 1580 },
    gtSm: { minWidth: 660 + 1 },
    gtMd: { minWidth: 880 + 1 },
    gtLg: { minWidth: 1120 + 1 },
    gtXl: { minWidth: 1320 + 1 },
    gtXxl: { minWidth: 1580 + 1 },
  },
  shorthands: {
    center: { alignItems: 'center', justifyContent: 'center' },
    f: { flex: 1 },
    fac: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  },
  // Добавляем поддержку SSR
  disableInjectCSS: true,
});

module.exports = tamaguiConfig;
