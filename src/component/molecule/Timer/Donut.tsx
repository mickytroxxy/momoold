import {Box, Text} from '@atom';
import * as React from 'react';
import {Easing, TextInput, Animated, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {G, Circle, Rect} from 'react-native-svg';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type DonutType = {
  duration?: number;
  strokeWidth?: number;
  radius?: number;
  color?: string;
  formattedTime?: any;
  //   bg?: keyof Theme['colors'];
  size?: number;
  thickness?: number;
  start?: boolean;
  setstartTimer?: any;
};
export default function Donut({
  radius = 60,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  start = false,
  formattedTime,
  setstartTimer,
}: DonutType) {
  const percentage = 100;
  const max = 100;

  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const gradientColors = ['#4D849C', '#004F71', '#003654'];
  const RADIUS = radius;
  const DIAMETER = RADIUS * 2;
  const boxSize = DIAMETER - 2 * strokeWidth;
  const animation = toValue => {
    return Animated.timing(animated, {
      toValue,
      duration: 20000,
      //   duration: duration,
      useNativeDriver: false,
      // useNativeDriver: true,
    }).start(() => {
      setstartTimer(false);
      // animation(toValue === 0 ? percentage : 0);
    });
  };
  const circumference = 2 * Math.PI * radius;
  React.useEffect(() => {
    start && animation(percentage);
    animated.addListener(
      v => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
        // if (inputRef?.current) {
        //   inputRef.current.setNativeProps({
        //     text: `${Math.round(v.value)}`,
        //   });
        // }
      },
      [max, percentage],
    );
    return () => {
      animated.removeAllListeners();
    };
  }, [start]);

  //   const start = () => {
  //     animation(percentage);
  //   };

  return (
    <LinearGradient
      colors={gradientColors}
      style={{
        borderRadius: DIAMETER / 2,
        width: DIAMETER,
        height: DIAMETER,
        position: 'relative',
      }}>
      <Box
        width={boxSize}
        height={boxSize}
        borderRadius={boxSize / 2}
        bg={'white'}
        justifyContent={'center'}
        alignItems={'center'}
        style={{
          position: 'absolute',
          top: strokeWidth,
          left: strokeWidth,
          // backgroundColor:
        }}>
        <Text
          variant={'headings'}
          fontSize={18}
          // color={time === 0 ? 'grey' : timerFontColour}
          style={
            {
              //   color: time === 0 ? timerEndProgress : timerFontColour,
            }
          }>
          {formattedTime()}
        </Text>
      </Box>
      <Svg
        height={DIAMETER}
        width={DIAMETER}
        style={{
          transform: [{rotateY: '180deg'}],
        }}
        viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}>
        <G rotation="-90" origin={`${DIAMETER / 2}, ${DIAMETER / 2}`}>
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={DIAMETER / 2 - 5}
            // r={radius}
            fill="transparent"
            stroke={'#afafaf'}
            // stroke={'red'}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
            //   rotation={90}
          />
        </G>
      </Svg>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  text: {fontWeight: '900', textAlign: 'center'},
});
