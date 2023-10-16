import React, {ReactNode} from 'react';
import {ImageBackground, useWindowDimensions} from 'react-native';

type Props = {};

import {Box} from '@/component/atom';
import {onBoardingImage} from '@/constants/images';
import {headerDashboardHeader} from '@/style-dictionary-dist/momoStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  getFontSizeByWindowHeight as gsh,
  getFontSizeByWindowWidth as gsw,
} from '@/style/theme';

const {Bg} = onBoardingImage;
const CurvedHeaderBg = ({
  children,
  // height = gsh(180),
  height = 180,
  image = Bg,
}: {
  children?: ReactNode;
  height?: number;
  image?: any;
}) => {
  const {width} = useWindowDimensions();
  // const {HeaderBg, Bg} = onBoardingImage;
  const {top} = useSafeAreaInsets();
  return (
    <Box>
      {/* <HeaderBackground width={"100%"} /> */}
      <ImageBackground
        source={image}
        // imageStyle={{
        //     tintColor: headerDashboardHeader
        // }}
        style={{
          width: '100%',
          // height: '100%',
          height: gsh(height),
          //   height: moderateScale(273),
        }}>
        {/* <Image source={HeaderBg}/> */}
        {children}
      </ImageBackground>
    </Box>
  );
};

export default CurvedHeaderBg;
