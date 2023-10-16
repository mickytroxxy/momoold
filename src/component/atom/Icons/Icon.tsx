import {View, Text} from 'react-native';
import React from 'react';
import icon, {SvgIconType} from '@/constants/icon';
import SvgIcons from '@/constants/icon';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import {SvgProps} from 'react-native-svg';

type IconType = SvgProps & {
  name: SvgIconType;
  h?: number;
  w?: number;
  size?: number;
  color?: string;
};

const Icon = ({
  name,
  h = 18,
  w = 18,
  size = 18,
  color = '#004F71',
  ...props
}: IconType) => {
  SvgIcons;
  const IconComponent = SvgIcons[name];
  return (
    <IconComponent
      width={getFontSizeByWindowWidth(size || w)}
      height={getFontSizeByWindowHeight(size || h)}
      color={color}
      {...props}
    />
  );
};

export default Icon;
