import {Box, Text} from '@/component/atom';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

interface SwitchProps {
  inActiveColor?: string;
  active: boolean;
  disabled?: boolean;
  onPress?: () => void;
  label?: string;
}

const ToggleSwitch = ({
  active,
  onPress,
  disabled = false,
  label,
}: SwitchProps) => {
  const activeColor = Platform.select({
    ios: '#0FAF4B99',
    android: '#0FAF4B99',
    // android: '#0FAF4B',
  });
  const inActiveColor = Platform.select({
    ios: '#5F5F5F',
    android: '#5F5F5F',
    // android: '#AFAFAF',
  });
  const {colors} = useTheme<Theme>();

  const progress = React.useRef(new Animated.Value(active ? 3 : 22)).current;
  const switchTranslate = React.useRef(
    // new Animated.Value((!disabled && active ? 25 : -9),
    new Animated.Value(active ? -9 : 25),
  ).current;

  const customSpringStyles = React.useMemo(
    () => ({
      transform: [
        {
          translateX: switchTranslate,
        },
      ],
    }),
    [switchTranslate],
  );

  // Background Color Animation
  const backgroundColorStyle = React.useMemo(
    () => ({
      backgroundColor: progress.interpolate({
        inputRange: [0, 22],
        //   @ts-ignore
        outputRange: [inActiveColor, activeColor],
      }),
    }),
    [progress, activeColor, inActiveColor],
  );

  const handlePress = React.useCallback(() => {
    if (!disabled && onPress) {
      onPress();
    }
  }, [disabled, onPress]);

  React.useEffect(() => {
    Animated.spring(switchTranslate, {
      toValue: active ? -9 : 25,
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      useNativeDriver: false,
    }).start();
  }, [disabled, switchTranslate]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Box flexDirection={'row'} alignItems={'center'} gap={'hs'}>
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <Animated.View
            style={[
              styles.circle,
              customSpringStyles,
              {
                backgroundColor: Platform.select({
                  android: active ? '#AFAFAF ' : '#0FAF4B',
                  ios: active ? '#AFAFAF' : '#0FAF4B',
                //   ios: '#0FAF4B',
                }),
              },
            ]}
          />
        </Animated.View>
        {label && <Text variant={'body'}>{label}</Text>}
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    width: 38,
    height: 20,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#F2F5F7',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
