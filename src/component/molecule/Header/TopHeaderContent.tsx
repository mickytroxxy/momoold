import {Box, Text} from '@/component/atom';
import {Theme} from '@/typings/globalTheme';
import React, {ReactNode} from 'react';
import {Platform, StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import RoundIconButton from "./RoundIconButton";
import DeviceInfo from 'react-native-device-info';
import { getFontSizeByWindowWidth } from '@/style/theme';

const isIphoneX = DeviceInfo.hasNotch();
interface TopHeaderContentProps {
  left?: {
    leftComp: ReactNode;
    onPress?: () => void;
  };
  center?: {
    centerComp: ReactNode;
    onPress?: () => void;
  };
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  right?: {
    rightComp: ReactNode;
    onPress?: () => void;
  };
  ph?: keyof Theme['spacing'];
  containerStyle?: StyleProp<ViewStyle>;
  pv?: keyof Theme['spacing'];
}

const TopHeaderContent = ({
  left,
  title,
  right,
  center,
  titleStyle,
  ph = 'hm',
  pv,
  containerStyle,
}: TopHeaderContentProps) => {
  const insets = useSafeAreaInsets();
  const {leftComp, onPress: onLeftPress} = left || {};
  const {centerComp, onPress} = center || {};
  const {rightComp, onPress: onRightPress} = right || {};
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={ph}
      paddingVertical={pv}
      style={[
        containerStyle,
        isIphoneX && {
          marginTop: -12,
        },
      ]}
      // bg={'red100'}
    >
      {left ? (
        <Box flex={1} alignItems={'flex-start'}>
          {leftComp && leftComp}
        </Box>
      ) : (
        <Box flex={1} />
      )}
      {/* CENTER */}
      {center || title ? (
        centerComp ? (
          centerComp
        ) : (
          <Text variant="header" color={'white'} style={[titleStyle, {
            fontSize: getFontSizeByWindowWidth(16)
          }]}>
            {title}
          </Text>
        )
      ) : (
        <Box />
      )}
      {/* RIGHT */}
      {right ? (
        <Box alignItems={'flex-end'} flex={1}>
          {rightComp && rightComp}
        </Box>
      ) : (
        <Box flex={1} />
      )}
    </Box>
  );
};

// TopHeaderContent.defaultProps = {dark: false};

export default TopHeaderContent;
