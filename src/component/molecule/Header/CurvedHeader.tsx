import React, {ReactNode} from 'react';
import {useWindowDimensions} from 'react-native';

type Props = {};

import {Box} from '@/component/atom';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';

type CurvedHeaderType = {
  height?: number;
  diameter?: number;
};
const CurvedHeader = ({height = 336, diameter = 502}: CurvedHeaderType) => {
  const {width} = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const HAIT = moderateScale(height);
  // const HAIT = moderateScale(480);
  // const CIRCLE_DIAMETER = moderateScale(777);
  const CIRCLE_DIAMETER = moderateScale(diameter);
  const HEADER_HEIGHT = -HAIT;
  const DISTANCE_FROM_TOP = HAIT;
  return (
    <Box>
      <Box
        bg={'momoBlue'}
        // flex={0.3}
        borderRadius={CIRCLE_DIAMETER / 2}
        height={CIRCLE_DIAMETER}
        width={CIRCLE_DIAMETER}
        position={'absolute'}
        top={HEADER_HEIGHT}
        justifyContent={'center'}
        style={{
          paddingTop: DISTANCE_FROM_TOP,
        }}
        alignSelf={'center'}
        overflow={'hidden'}
        alignItems={'center'}>
        <LinearGradient
          style={{flex: 1, width}}
          colors={['#004F71', '#003654']}></LinearGradient>
      </Box>
      {/* <Box height={CIRCLE_DIAMETER - HAIT}>{children}</Box> */}
    </Box>
  );
};
{
  /* <Box height={CIRCLE_DIAMETER - HAIT + top}> */
}

export default CurvedHeader;
