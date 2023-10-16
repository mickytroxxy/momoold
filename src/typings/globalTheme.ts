import {Theme as ThemeType} from '@/style/theme';

export type Theme = ThemeType & {
  colors: ThemeType['colors'] & {
    primaryColor: string;
  };
};
