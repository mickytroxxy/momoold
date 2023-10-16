import {Theme} from '@/typings/globalTheme';
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

const ProgressBar = ({
  progress,
  segments,
}: {
  progress: number;
  segments: number;
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const {width} = useWindowDimensions();
  const PROGRESS_WIDTH = width - 30 - 15;
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
      // outputRange: ['0%', `${segmentWidth}%`, `${segmentWidth}%`],
        const segmentProgress = animation.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: ['0%', `${segmentWidth }%`, `${segmentWidth}%`],
          extrapolate: 'clamp',
        });
      // const segmentProgress = animation.interpolate({
      //     inputRange: [index - 1, index - 0.5, index, index + 0.5, index + 1],
      //     outputRange: ['0%', '0%', `${segmentWidth * 0.5}%`, `${segmentWidth * 0.7}%`, `${segmentWidth}%`],
      //     extrapolate: 'clamp',
      //   });
      // const segmentProgress = animation.interpolate({
      //   inputRange: [
      //     index - 1,
      //     index - 0.7,
      //     index - 0.6,
      //     index - 0.5,
      //     index - 0.4,
      //     //   index - 0.3,
      //     //   index - 0.2,
      //     //   index - 0.1,
      //     index,
      //     index + 0.1,
      //     index + 0.2,
      //     index + 0.3,
      //     index + 0.4,
      //     index + 0.5,
      //     index + 0.6,
      //     index + 0.7,
      //     index + 1,
      //   ],
      //   outputRange: [
      //     '0%',
      //     '0%',
      //     '0%',
      //     '0%',
      //     '0%',
      //     //   '0%',
      //     //   '0%',
      //     //   '0%',
      //     `${segmentWidth * 0.7}%`,
      //     `${segmentWidth * 0.72}%`,
      //     `${segmentWidth * 0.72}%`,
      //     `${segmentWidth * 0.75}%`,
      //     `${segmentWidth * 0.8}%`,
      //     `${segmentWidth * 0.85}%`,
      //     `${segmentWidth * 0.9}%`,
      //     `${segmentWidth * 0.95}%`,
      //     `${segmentWidth}%`,
      //   ],
      //   extrapolate: 'clamp',
      // });
      const segmentStyle: Animated.AnimatedProps<StyleProp<ViewStyle>> = {
        width: segmentProgress,
        backgroundColor: colors.sunshineYellow,
        borderRadius: 6,
        position: 'relative',
        zIndex: 5,
        // backgroundColor: segmentProgress ? 'green100' : 'black',
      };
      return (
        // <View style={[{width: '100%'}]}>
        <Animated.View key={index} style={[styles.segment, segmentStyle]}>
          <View
            style={{width: PROGRESS_WIDTH / 2, backgroundColor: 'blue'}}></View>
        </Animated.View>
        // {/* </View> */}
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
        }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View
            key={index}
            style={{
              borderRadius: 6,
              backgroundColor: colors.extraLightGrey,
              width: '25%',
              marginRight: 5,
            }}
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

export default ProgressBar;
