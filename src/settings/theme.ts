interface Theme {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  mint: string;
  teal: string;
  cyan: string;
  blue: string;
  indigo: string;
  purple: string;
  pink: string;
  brown: string;
}

const dark: Theme = {
  red: 'rgb(255, 59, 48)',
  orange: 'rgb(255, 149, 0)',
  yellow: 'rgb(255, 204, 0)',
  green: 'rgb(76, 217, 100)',
  mint: 'rgb(90, 200, 250)',
  teal: 'rgb(90, 200, 250)',
  cyan: 'rgb(0, 122, 255)',
  blue: 'rgb(0, 122, 255)',
  indigo: 'rgb(88, 86, 214)',
  purple: 'rgb(175, 82, 222)',
  pink: 'rgb(255, 45, 85)',
  brown: 'rgb(142, 142, 147)',
};

const light: Theme = {
  red: 'rgb(255, 69, 58)',
  orange: 'rgb(255, 159, 10)',
  yellow: 'rgb(255, 214, 10)',
  green: 'rgb(52, 199, 89)',
  mint: 'rgb(48, 209, 88)',
  teal: 'rgb(100, 210, 255)',
  cyan: 'rgb(10, 132, 255)',
  blue: 'rgb(10, 132, 255)',
  indigo: 'rgb(94, 92, 230)',
  purple: 'rgb(191, 90, 242)',
  pink: 'rgb(255, 55, 95)',
  brown: 'rgb(142, 142, 147)',
};

const theme = {
  dark,
  light,
};

export type ThemeType = keyof Theme;

export enum ThemeSchemesEnum {
  dark = 'dark',
  light = 'light',
}

export default theme;
