import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui({
  defaultTheme: {
    light: {
      background: '#ffffff',
      backgroundContrast: '#000000',
      color: '#000000',
      colorContrast: '#ffffff',
    },
    dark: {
      background: '#000000',
      backgroundContrast: '#ffffff',
      color: '#ffffff',
      colorContrast: '#000000',
    },
  },
  tokens: {
    color: {},
    size: {},
    space: {},
    radius: {},
    zIndex: {},
  },
  themes: {
    light: {},
    dark: {},
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
  shorthands: {},
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
