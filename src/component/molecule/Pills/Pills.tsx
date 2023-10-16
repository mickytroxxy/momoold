import React from 'react';
import {Box, Text} from '@atom';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';

type pillsType = {
  label?: string;
  size?: 'large' | 'medium' | 'small';
  pillType:
    | 'bundles'
    | 'alerts'
    | 'instructions'
    | 'packages'
    | 'filter'
    | 'input';
  alertColor?: '#5CB85C' | '#FF9400' | '#C2334D';
  outline?: boolean;
  cancel?: boolean;
  position?: 'left' | 'right';
  // position?: 'left' | 'right'
};
const Pills = ({
  label,
  size,
  pillType,
  alertColor,
  outline,
  cancel,
  position,
}: pillsType) => {
  const {colors} = useTheme<Theme>();
  let fontSize;
  let lineHeight;
  let bg: StyleProp<ViewStyle>;
  let tStyle: StyleProp<TextStyle>;
  switch (size) {
    case 'large':
      fontSize = getFontSizeByWindowWidth(14);
      lineHeight = getFontSizeByWindowWidth(18.2);
      break;
    case 'medium':
      fontSize = getFontSizeByWindowWidth(10);
      lineHeight = getFontSizeByWindowWidth(13);
      break;
    case 'small':
      fontSize = getFontSizeByWindowWidth(8);
      lineHeight = getFontSizeByWindowWidth(10.4);
      break;

    default:
      fontSize = getFontSizeByWindowWidth(12);
      lineHeight = getFontSizeByWindowWidth(15.6);
      break;
  }
  switch (pillType) {
    case 'bundles':
      bg = {
        backgroundColor: colors.sunshineYellow,
        paddingHorizontal: getFontSizeByWindowWidth(10),
        paddingVertical: getFontSizeByWindowHeight(2),
      };
      tStyle = {
        color: colors.black,
        // fontWeight: '400'
      };
      break;
    case 'alerts':
      bg = {
        // backgroundColor: colors.sunshineYellow,
        paddingHorizontal: getFontSizeByWindowWidth(10),
        borderWidth: 1, //#5CB85C
        // borderColor: colors.orange100, //#C2334D
        borderColor: alertColor,
      };
      tStyle = {
        color: alertColor,
      };
      break;
    case 'instructions':
      bg = {
        // backgroundColor: colors.sunshineYellow,
        paddingHorizontal: getFontSizeByWindowWidth(10),
        borderWidth: 1, //#5CB85C
        borderColor: '#C2334D',
      };
      tStyle = {
        color: '#C2334D',
      };
      break;
    case 'packages':
      bg = {
        paddingHorizontal: getFontSizeByWindowWidth(27),
        backgroundColor: colors.sunshineYellow,
        borderRadius: 10,
        paddingVertical: getFontSizeByWindowHeight(6),
      };
      tStyle = {
        fontFamily: 'MTNBrighterSans-Medium',
        color: colors.black,
        fontSize: 12,
        lineHeight: 15.6,
      };
      break;
    case 'input':
      if (outline) {
        bg = {
          paddingHorizontal: getFontSizeByWindowWidth(25),
          paddingVertical: getFontSizeByWindowHeight(8),
          borderWidth: 1,
          borderRadius: 150,
          borderColor: 'black',
          gap: cancel ? 12 : 0,
          flexDirection: 'row',
        };
        tStyle = {
          fontFamily: 'MTNBrighterSans-Regular',
          color: 'black',
        };
        break;
      }
      bg = {
        paddingHorizontal: getFontSizeByWindowWidth(28),
        backgroundColor: colors.momoBlue,
        paddingVertical: getFontSizeByWindowHeight(5),
        borderWidth: 1,
        borderRadius: 150,
        gap: cancel ? 12 : 0,
        flexDirection: 'row',
      };
      tStyle = {
        fontFamily: 'MTNBrighterSans-Regular',
        color: 'white',
      };
      break;

    case 'filter':
      if (outline) {
        bg = {
          paddingHorizontal: getFontSizeByWindowWidth(15),
          paddingVertical: getFontSizeByWindowHeight(5),
          borderRadius: 70,
          borderWidth: 1,
          borderColor: colors.momoBlue,
          gap: cancel ? 12 : 0,
          flexDirection: 'row',
        };
        tStyle = {
          fontFamily: 'MTNBrighterSans-Regular',
          color: colors.momoBlue,
        };
        break;
      }
      bg = {
        paddingHorizontal: getFontSizeByWindowWidth(25),
        backgroundColor: colors.momoBlue,
        paddingVertical: getFontSizeByWindowHeight(8),
        gap: cancel ? 12 : 0,
        flexDirection: 'row',
      };
      tStyle = {
        fontFamily: 'MTNBrighterSans-Regular',
        color: 'white',
      };
      break;

    default:
      break;
  }

  return (
    <>
      <Box
        borderRadius={18}
        px={'hsm'}
        justifyContent={'center'}
        alignItems={'center'}
        alignSelf={position === 'left' ? 'flex-start' : 'flex-end'}
        style={[bg]}>
        <Text
          fontSize={fontSize}
          lineHeight={lineHeight}
          fontFamily={'MTNBrighterSans-Regular'}
          style={[tStyle]}>
          {label}
        </Text>
        {pillType === 'filter' && cancel && <Text>x</Text>}
      </Box>
    </>
  );
};

export default Pills;
