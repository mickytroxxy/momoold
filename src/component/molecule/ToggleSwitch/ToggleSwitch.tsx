import {Box, Text} from '@/component/atom';
import { controlsTogglesAndroidSelectedBg } from '@/style-dictionary-dist/momoStyle';
import {getFontSizeByWindowWidth} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {
  Dimensions,
  PixelRatio,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  interpolateColor,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
// import {colors} from '../../styles/global';

interface SwitchProps {
  // activeColor?: string;
  inActiveColor?: string;
  active: boolean;
  disabled?: boolean;
  onPress?: () => void;
  label?: string;
}
const {scale, width} = Dimensions.get('window');

const rnModerateScaleWorklet = runOnUI(fontSize => {
  'worklet';
  const baseWidth = 320;
  // Perform size calculation here using native thread operations
  return PixelRatio.roundToNearestPixel(fontSize * (width / baseWidth));
});

const ToggleSwitch = ({
  active,
  onPress,
  disabled = false,
  label,
}: SwitchProps) => {
  const {colors} = useTheme<Theme>();
  // const activeColor = colors.green40;
  const inActiveColor = disabled ? '#E8E8E8' : '#AFAFAF';
  const activeColor = disabled ? '#E8E8E8' : controlsTogglesAndroidSelectedBg;
  const strt = getFontSizeByWindowWidth(22);
  const stop = getFontSizeByWindowWidth(3);
  const progress = useDerivedValue(() => {
    return withSpring(active ? strt : stop, {
      // return withSpring(!disabled && active ? strt : stop, {
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    });
  });
  const transActive = Platform.select({
    android: getFontSizeByWindowWidth(23),
    ios: getFontSizeByWindowWidth(21),
  });
  const transInActive = Platform.select({
    android: -1,
    // android: -9,
    ios: 2,
  });

  const switchTranslate = useDerivedValue(() => {
    // return withTiming(!disabled && active ? 25 : -9);
    return withTiming(active ? transActive! : transInActive!);
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: switchTranslate.value,
        },
      ],
    };
  });

  // Background Color Animation
  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      //   @ts-ignore
      [inActiveColor, activeColor],
    );
    return {
      backgroundColor,
    };
  });
  // Background Color Animation
  const circleColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      //   @ts-ignore
      [colors.green100, '#fff'],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // setActive(!active);
        // @ts-ignore
        !disabled && onPress && onPress();
      }}>
      <Box
        flexDirection={'row'}
        alignItems={'center'}
        style={{
          gap: 20,
        }}>
        {label && (
          <Text
            style={{
              fontFamily: 'MTNBrighterSans-Regular',
              color: '#5F5F5F',
              fontSize: getFontSizeByWindowWidth(16),
              lineHeight: getFontSizeByWindowWidth(24),
            }}>
            {label}
          </Text>
        )}
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <Animated.View
            style={[
              styles.circle,
              customSpringStyles,
              // circleColorStyle,
              {
                backgroundColor: active
                  ? disabled
                    ? 'white'
                    : colors.green100
                  : 'white',
                elevation: disabled ? 1 : 4
              },
            ]}
          />
        </Animated.View>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    // width: 50,
    width: getFontSizeByWindowWidth(43),
    height: Platform.select({
      ios: getFontSizeByWindowWidth(24),
      android: getFontSizeByWindowWidth(14),
    }),
    borderRadius: Platform.select({
      ios: getFontSizeByWindowWidth(14),
      android: getFontSizeByWindowWidth(12),
    }),
    // height: 28,
    // height: 20,
    justifyContent: 'center',
    backgroundColor: '#F2F5F7',
  },
  circle: {
    width: getFontSizeByWindowWidth(20),
    height: getFontSizeByWindowWidth(20),
    borderRadius: getFontSizeByWindowWidth(10),
    shadowColor: 'black',
    // elevation: ,
  },
});
