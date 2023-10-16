import {Theme} from '@/typings/globalTheme';
import { Box } from '@atom';
import {color, useTheme} from '@shopify/restyle';
import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';

const Stepper = ({
  progress,
  segments,
}: {
  progress: number;
  segments: number;
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const PROGRESS_WIDTH = width - 40 - 5 * (segments - 1);
  // const PROGRESS_WIDTH = width - 30 - (5 * segments - 1);
  const {colors} = useTheme<Theme>();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 500, // Adjust this value to control the animation speed
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const renderSegments = () => {
    const segmentWidth = 100 / segments;

    return Array.from({length: segments}).map((_, index) => {
      console.log('index', index);
      const segmentProgress = animation.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: ['0%', `${segmentWidth}%`, `${segmentWidth}%`],
        extrapolate: 'clamp',
      });

      const segmentStyle: Animated.AnimatedProps<StyleProp<ViewStyle>> = {
        width: segmentProgress,
        backgroundColor: colors.sunshineYellow,
        borderRadius: 6,
        borderTopLeftRadius: index === 0 ? 0 : 6,
        borderBottomLeftRadius: index === 0 ? 0 : 6,
        borderTopRightRadius: index === segments - 1 ? 0 : 6,
        borderBottomRightRadius: index === segments - 1 ? 0 : 6,
        position: 'relative',
        zIndex: 5,
      };
      return (
        <Animated.View key={index} style={[styles.segment, segmentStyle]} />
      );
    });
  };

  return (
    <View
      style={[styles.container, {width: PROGRESS_WIDTH, position: 'relative'}]}>
      {renderSegments()}

      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          flexDirection: 'row',
          width: '100%',
          borderRadius: 6,
          zIndex: -10,
          gap: 5,
          // backgroundColor: 'red'
        }}>
        {Array.from({length: segments}).map((_, index) => (
          <Box
            key={index}
            borderRadius={6}
            width={ `${100 / segments}%`}
            borderTopRightRadius={index === segments - 1 ? 0 : 6}
            borderBottomRightRadius={index === segments - 1 ? 0 : 6}
            bg={'extraLightGrey'}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 5,
    // height: 10,
    // backgroundColor: 'yellow', // Customize the color for later segments
  },
  segment: {
    height: '100%',
    // flex:1,
    marginRight: 5, // Adjust this value to control the spacing between segments
  },
  laterSegment: {
    flex: 1,
    backgroundColor: 'yellow', // Customize the color for later segments
  },
});

export default Stepper;
