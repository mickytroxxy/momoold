import {getFontSizeByWindowHeight, getFontSizeByWindowWidth} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Box, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import React from 'react';

type HBalanceType = {
  title1: string;
  title2: string;
};
const HBalance = ({title1, title2}: HBalanceType) => {
  const {colors} = useTheme<Theme>();
  return (
    <Box
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: getFontSizeByWindowHeight(2.5),
        paddingVertical: getFontSizeByWindowHeight(10),
      }}>
      <Text
        style={{
          fontSize: getFontSizeByWindowWidth(12),
          fontFamily: 'MTNBrighterSans-Regular',
          color: colors.momoBlue,
          lineHeight: getFontSizeByWindowWidth(15.6),
        }}>
        {title1}
      </Text>
      <Text
        style={{
          fontSize: getFontSizeByWindowWidth(18),
          lineHeight: getFontSizeByWindowWidth(22.5),
          fontFamily: 'MTNBrighterSans-Medium',
          color: colors.momoBlue,
          textAlign: 'center',
        }}>
        {title2}
      </Text>
    </Box>
  );
};

export default HBalance;
