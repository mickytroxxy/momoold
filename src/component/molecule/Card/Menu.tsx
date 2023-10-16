import {
  cardsMenuHeight,
  cardsMenuWidth,
} from '@/style-dictionary-dist/momoStyle';
import {getFontSizeByWindowHeight} from '@/style/theme';
import {gpsh, gpsw} from '@/utils/parseTokenStyle';
import React, {ReactNode} from 'react';
import Card from './Card';
import {StyleProp, ViewStyle} from 'react-native';
import {BoxProps} from '@/component/atom/Box';

type menuType = BoxProps & {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'noShadow' | 'shadow';
};
const Menu = ({children, style, variant = 'noShadow', ...props}: menuType) => {
  return (
    <Card
      variant={variant}
      style={[
        {
          width: gpsw(cardsMenuWidth),
          // height: gpsh(cardsMenuHeight),
          paddingVertical: getFontSizeByWindowHeight(16),
          flexDirection: 'row',
        },
        style,
      ]}
      {...props}>
      {children}
    </Card>
  );
};

export default Menu;
