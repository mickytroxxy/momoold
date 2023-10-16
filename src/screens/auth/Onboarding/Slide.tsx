import {View, useWindowDimensions, Image} from 'react-native';
import React from 'react';
import {onBoardingImage} from '@/constants/images';
import icon from '@/constants/icon';
import {Box, Text} from '@/component/atom';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';

const Slide = ({
  text,
  description,
  Source,
}: {
  text: string;
  description: string;
  Source: string;
}) => {
  const {height, width} = useWindowDimensions();
  const {Onboard1, Onboard2, Onboard3, Onboard4} = onBoardingImage;
  const {BottomTabIcon} = icon;
  const {colors, spacing} = useTheme<Theme>();

  return (
    <View
      style={{
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <View
        style={{
          flex: 0.6,
           justifyContent: "center"
        }}>
        <Source  />
      </View>
      {/* <Text style={{fontSize: 30}}>{text}</Text> */}
      <Box flex={0.4} px={'hm'}>
        <Text variant={'headings'} textAlign={'center'} mb={'vm'}>
          {text}
        </Text>
        <Text variant={'body'} textAlign={'center'}>
          {description}
        </Text>
      </Box>
    </View>
  );
};

export default Slide;
