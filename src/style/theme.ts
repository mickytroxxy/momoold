import {
  buttonCornerRadius,
  buttonExtraSmall,
  buttonExtraSmallFontSize,
  buttonLarge,
  buttonSmall,
  globalBackgroundShading,
  globalBlack,
  globalExtraLightGrey,
  globalGreen100,
  globalGreen40,
  globalGreen60,
  globalGreen80,
  globalGrey,
  globalLightGrey,
  globalMoMoBlue,
  globalMoMoDarkBlue,
  globalMoMoLightBlue,
  globalMtnBrighterSansMedium12,
  globalMtnBrighterSansRegular12,
  globalOrange100,
  globalOrange40,
  globalOrange60,
  globalOrange80,
  globalRed100,
  globalRed40,
  globalRed60,
  globalRed80,
  globalSunshineYellow,
  globalWhite,
} from '@/style-dictionary-dist/momoStyle';
import {Dimensions, PixelRatio, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Scaler} from './scaler';

export const palette = {
  transparent: 'transparent',
  buttonDefault: globalMoMoBlue,

  momoBlue: globalMoMoBlue, //#004f71
  momoDarkBlue: globalMoMoDarkBlue, //#003654
  momoLightBlue: globalMoMoLightBlue, //#4d849c

  sunshineYellow: globalSunshineYellow, //#ffcb05
  black: globalBlack, //#000000
  grey: globalGrey, //#5f5f5f
  lightGrey: globalLightGrey, //#afafaf
  extraLightGrey: globalExtraLightGrey, //#e8e8e8
  white: globalWhite, //#ffffff
  backgroundShading: globalBackgroundShading, //#f2f2f2
  red40: globalRed40, //#F8aeae
  red60: globalRed60, //#F48585
  red80: globalRed80, //#F15D5D
  red100: globalRed100, //#ed3434
  green40: globalGreen40, //#9fdfb7
  green60: globalGreen60, //#6fcf93
  green80: globalGreen80, //#3fbf6f
  green100: globalGreen100, //#0faf4b
  orange40: globalOrange40, //#FFD499
  orange60: globalOrange60, //#FFBF66
  orange80: globalOrange80, //#FFA933
  orange100: globalOrange100, //#ff9400
  shadow: '#333333',
  shadowIos: '#333333',
};
const fontFamily = (family: string) => `MTNBrighterSans-${family}`;
const {scale, width, height} = Dimensions.get('window');
// console.log('width', width)
console.log('height', height);

// }
export function getFontSizeByWindowWidth(fontSize: number) {
  const baseWidth = 320; // width of smallest iPhone
  // return verticalScale(fontSize);
  // return moderateScale(fontSize);
  // return fontSize
  return PixelRatio.roundToNearestPixel(fontSize * (width / baseWidth));
}

export function getFontSizeByWindowHeight(fontSize: number) {
  const baseHeight = 700; // width of smallest iPhone
  // return moderateScale(fontSize);
  // return fontSize
  return width > 700
    ? PixelRatio.roundToNearestPixel(fontSize * (1000 / baseHeight))
    : PixelRatio.roundToNearestPixel(fontSize * (height / baseHeight));
}

export const lightThemes = {
  textVariants: {
    defaults: {
      fontSize: getFontSizeByWindowWidth(14),
      fontFamily: 'MTNBrighterSans-Medium',
      color: 'grey',
    },
    storyHead: {
      fontFamily: 'MTNBrighterSans-Bold',
      fontSize: getFontSizeByWindowWidth(18),
      lineHeight: getFontSizeByWindowWidth(23.4),
      color: 'momoDarkBlue',
    },
    regular12: {
      fontFamily: fontFamily(globalMtnBrighterSansRegular12.fontWeight),
      fontSize: getFontSizeByWindowWidth(
        parseInt(globalMtnBrighterSansRegular12.fontSize),
      ),
      lineHeight: getFontSizeByWindowHeight(15.6),
      color: 'grey',
    },
    medium12: {
      fontFamily: fontFamily(globalMtnBrighterSansMedium12.fontWeight),
      fontSize: moderateScale(parseInt(globalMtnBrighterSansMedium12.fontSize)),
      lineHeight: moderateScale(15.6),
    },
    medium14: {},
    medium16: {},
    medium18: {},
    headings: {
      fontFamily: 'MTNBrighterSans-Bold',
      // fontWeight: '500',
      fontSize: getFontSizeByWindowWidth(18),
      lineHeight: getFontSizeByWindowWidth(23.4),
      color: 'black',
    },
    header: {
      fontFamily: 'MTNBrighterSans-Bold',
      fontSize: getFontSizeByWindowWidth(16),
      lineHeight: getFontSizeByWindowWidth(20.8),
      color: 'sunshineYellow',
      alignSelf: 'center',
    },
    body: {
      fontFamily: 'MTNBrighterSans-Regular',
      fontSize: 16,
      lineHeight: 24,
      color: 'grey',
    },
    xl: {
      fontFamily: 'MTNBrighterSans-Bold',
      fontSize: 16,
      lineHeight: 20.8,
      color: 'grey',
    },
    l: {
      fontFamily: 'MTNBrighterSans-Bold',
      fontSize: 20,
      lineHeight: 40,
      color: 'grey',
    },
    test: {
      fontSize: 16,
      lineHeight: 24,
    },
    extraSmall: {
      fontFamily: 'MTNBrighterSans-Regular',
      fontSize: moderateScale(parseInt(buttonExtraSmallFontSize)),
      textTransform: buttonExtraSmall.textCase,
    },
    small: {
      fontFamily: 'MTNBrighterSans-Medium',
      fontSize: moderateScale(parseInt(buttonSmall.fontSize)),
      textTransform: buttonLarge.textCase,
    },
    medium: {
      fontFamily: 'MTNBrighterSans-Medium',
      fontSize: moderateScale(14),
      lineHeight: moderateScale(18.2),
      textTransform: buttonLarge.textCase,
    },
    fullWidth: {
      fontFamily: 'MTNBrighterSans-Medium',
      fontSize: moderateScale(14),
      lineHeight: moderateScale(19.8),
      textTransform: buttonLarge.textCase,
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: getFontSizeByWindowWidth(9),
    },
    noShadow: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: getFontSizeByWindowWidth(9),
    },
    shadow: {
      elevation: 14,
      shadowColor: Platform.select({
        ios: 'lightGrey', //878787  9b9b9b
        android: 'shadow', // 5b5b5b 4f4f4f
      }),
      shadowOffset: {
        width: 1,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
    },
  },
  buttonVariants: {
    defaults: {
      paddingVertical: 'vs',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(parseInt(buttonCornerRadius)),
      // paddingHorizontal: 's',
    },
    primary: {
      backgroundColor: 'buttonDefault',
    },
    secondary: {
      borderColor: 'momoBlue',
      borderWidth: 1,
    },
    tertiary: {},
  },
  colors: {
    ...palette,
    mainBackground: palette.white,
    cardPrimaryBackground: palette.white,
    tests: palette.black,
  },

  spacing: {
    '0': getFontSizeByWindowWidth(0),
    xxs: getFontSizeByWindowWidth(5),
    hxxs: getFontSizeByWindowWidth(5),
    hxs: getFontSizeByWindowWidth(8),
    hsm: getFontSizeByWindowWidth(10),
    hs: getFontSizeByWindowWidth(16),
    hm: getFontSizeByWindowWidth(20),
    hl: getFontSizeByWindowWidth(24),
    hxl: getFontSizeByWindowWidth(40),
    vxxs: getFontSizeByWindowHeight(5),
    vxs: getFontSizeByWindowHeight(8),
    vsm: getFontSizeByWindowHeight(10),
    vs: getFontSizeByWindowHeight(16),
    vm: getFontSizeByWindowHeight(20),
    sm: getFontSizeByWindowHeight(20),
    vl: getFontSizeByWindowHeight(24),
    vxl: getFontSizeByWindowHeight(40),
  },
  breakpoints: {
    phone: 0,
    iph: 0,
    tablet: 768,
    longPhone: {
      width: 0,
      height: 812,
    },
    largeTablet: 1024,
  },
};

export const darkThemes: Theme = {
  ...lightThemes,
  colors: {
    ...lightThemes.colors,
    tests: palette.white,
    mainBackground: palette.black,
    cardPrimaryBackground: palette.white,
  },
};

export type Theme = typeof lightThemes;
export default lightThemes;
