import React from 'react';
import {Box, Text} from '@atom';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

type pillsType = {
  label: string;
  size: 'large' | 'medium' | 'small';
  pillType: 'bundles' | 'alerts' | 'instructions' | 'packages' | 'filter';
};
const Pills = ({label, size, pillType}: pillsType) => {
  const {colors} = useTheme<Theme>();
  let fontSize;
  let lineHeight;
  let bg: StyleProp<ViewStyle>;
  let tStyle: StyleProp<TextStyle>;
  switch (size) {
    case 'large':
      fontSize = moderateScale(14);
      lineHeight = moderateScale(18.2);
      break;
    case 'medium':
      fontSize = moderateScale(10);
      lineHeight = moderateScale(13);
      break;
    case 'small':
      fontSize = moderateScale(8);
      lineHeight = moderateScale(10.4);
      break;

    default:
      fontSize = moderateScale(12);
      lineHeight = moderateScale(15.6);
      break;
  }
  switch (pillType) {
    case 'bundles':
      bg = {
        backgroundColor: colors.sunshineYellow,
        paddingHorizontal: 10,
      };
      tStyle = {
        color: colors.black,
      };
      break;
    case 'alerts':
      bg = {
        // backgroundColor: colors.sunshineYellow,
        paddingHorizontal: 10,
        borderWidth: 1, //#5CB85C
        borderColor: colors.orange100, //#C2334D
      };
      tStyle = {
        color: colors.orange100,
      };
      break;
    case 'instructions':
      bg = {
        // backgroundColor: colors.sunshineYellow,
        paddingHorizontal: 10,
        borderWidth: 1, //#5CB85C
        borderColor: '#C2334D',
      };
      tStyle = {
        color: '#C2334D',
      };
      break;
    case 'packages':
      bg = {
        paddingHorizontal: 15,
        backgroundColor: colors.sunshineYellow,
      };
      tStyle = {
        fontFamily: 'MTNBrighterSans-Regular',
        color: colors.black,
      };
      break;
    case 'filter':
      bg = {
        paddingHorizontal: 25,
        backgroundColor: colors.momoBlue,
        paddingVertical: 8,
      };
      tStyle = {
        fontFamily: 'MTNBrighterSans-Regular',
      };
      break;

    default:
      break;
  }

  return (
    <>
      <Box
        bg={'sunshineYellow'}
        borderRadius={18}
        px={'hsm'}
        style={[bg]}>
        <Text
          fontSize={fontSize}
          lineHeight={lineHeight}
          fontFamily={'MTNBrighterSans-Light'}
          style={[tStyle]}>
          {label}
        </Text>
      </Box>
    </>
  );
};

export default Pills;
