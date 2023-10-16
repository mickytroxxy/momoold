import React from 'react';
import Card from './Card';
import {Box, Text} from '@atom';
import icons from '@/constants/icon';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import TouchableOpacity from '@/component/atom/TouchableOpacity';

type menuContentType = {
  label: string;
  icon?: any;
  onPress?: any;
};
const MenuContent = ({label, icon, onPress}: menuContentType) => {
  const {TvIcon} = icons;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'vxxs'}
      flex={1}>
      {icon ? (
        icon
      ) : (
        <TvIcon
          width={getFontSizeByWindowWidth(24)}
          height={getFontSizeByWindowHeight(24)}
          color={'#004F71'}
        />
      )}
      <Text
        fontSize={getFontSizeByWindowWidth(9)}
        lineHeight={getFontSizeByWindowHeight(11.7)}
        color={'grey'}
        fontFamily="MTNBrighterSans-Regular">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuContent;
