import React, {useRef, useEffect, useState} from 'react';
import {View, Animated} from 'react-native';
import {IOScrollView, InView} from 'react-native-intersection-observer';
import {Box, Text} from '../../atom';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

type LinearProgressBarType = {
  progress: number;
  total: number;
  barColor?: string;
  backgroundColor: string;
  height?: number;
  title?: string;
  unit?: string;
};

const LinearProgressBar = ({
  progress: pro,
  total,
  barColor,
  backgroundColor,
  height,
  title,
  unit,
}: LinearProgressBarType) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500, // You can adjust the animation duration as needed
      useNativeDriver: false,
    }).start();
  }, [animatedValue, progress]);

  const barWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  const handleStartAnimation = (inView: boolean) => {
    inView ? setProgress(pro / total) : setProgress(0); // Set the progress to 1 to trigger the animation
  };

  useFocusEffect(
    React.useCallback(() => {
      setProgress(pro / total);

      return () => setProgress(0);
    }, []),
  );

  return (
    // <IOScrollView>
    <InView
      onChange={(inView: boolean) => {
        // console.log('Inview:', inView);
        handleStartAnimation(inView);
        // inView && handleStartAnimation(inView);
      }}>
      <View>
        <Box flexDirection={'row'} mb={'vxs'} justifyContent={'space-between'}>
          <Text
            color={'momoBlue'}
            lineHeight={18}
            style={{
              fontSize: 13,
            }}>
            {title}
          </Text>
          <Text
            color={'grey'}
            lineHeight={18}
            style={{
              fontSize: 13,
            }}>
            <Text
              color={'momoBlue'}
              lineHeight={18}
              style={{
                fontSize: 13,
              }}>
              {pro}
            </Text>
            /{total}
            {unit}
          </Text>
        </Box>
        <View
          style={{
            height,
            backgroundColor,
            borderRadius: height! / 2,
            overflow: 'hidden',
          }}>
          <Animated.View
            style={{
              height,
              width: barWidth,
              backgroundColor: barColor,
            }}
          />
        </View>
      </View>
    </InView>
    // </IOScrollView>
  );
};

export default LinearProgressBar;
