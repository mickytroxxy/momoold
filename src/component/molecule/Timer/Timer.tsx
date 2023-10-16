import {Box, Text} from '@/component/atom';
import {
  timerEndProgress,
  timerFontColour,
} from '@/style-dictionary-dist/momoStyle';
import {getFontSizeByWindowWidth} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';

type TimerType = {
  DURATION: number;
  time: number;
  formattedTime?: any;
  bg?: keyof Theme['colors'];
  size?: number;
  thickness?: number;
};

const Timer = ({
  DURATION,
  formattedTime,
  time,
  bg = 'primaryColor',
  size: SIZE = 200,
  thickness: THICKNESS = 30,
}: TimerType) => {
  const gradientColors = ['#4D849C', '#004F71', '#003654'];

  const boxSize = SIZE - 2 * THICKNESS;
  return (
    <View>
      <LinearGradient
        colors={gradientColors}
        style={{
          borderRadius: SIZE / 2,
          width: SIZE - 1,
          height: SIZE -0.5,
          position: 'relative',
        }}>
        <Box
          width={boxSize}
          height={boxSize}
          borderRadius={boxSize / 2}
          bg={bg}
          justifyContent={'center'}
          alignItems={'center'}
          style={{
            position: 'absolute',
            top: THICKNESS,
            left: THICKNESS,
            // backgroundColor:
          }}>
          <Text
            variant={'headings'}
            fontSize={18}
            // color={time === 0 ? 'grey' : timerFontColour}
            style={{
              color: time === 0 ? timerEndProgress : timerFontColour,
              fontSize: getFontSizeByWindowWidth(18),
              lineHeight: getFontSizeByWindowWidth(23.4),
            }}>
            {formattedTime()}
          </Text>
        </Box>
        <Progress.Circle
          borderWidth={0}
          size={SIZE}
          color={'transparent'}
          progress={time / DURATION}
          unfilledColor={"#E8E8E8"}
          // unfilledColor='transparent'
          thickness={THICKNESS}
          // direction="counter-clockwise"
          direction="clockwise"
        />
      </LinearGradient>
    </View>
  );
};

export default Timer;
