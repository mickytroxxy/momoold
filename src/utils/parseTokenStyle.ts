import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';

export const gpsw = (size: string) => {
  return getFontSizeByWindowWidth(parseInt(size));
};

export const gpsh = (size: string) => {
  return getFontSizeByWindowHeight(parseInt(size));
};

// export default {
//   gsw,
//   gsh,
// };
