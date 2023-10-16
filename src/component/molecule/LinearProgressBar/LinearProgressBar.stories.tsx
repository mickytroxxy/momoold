import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import LinearProgressBar from './LinearProgressBar';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Text} from '../../atom';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
// import { Box, Text } from '@/component/atom';

const LinearProgressBarMeta: Meta<typeof LinearProgressBar> = {
  title: 'Controls/LinearProgressBar',
  component: LinearProgressBar,
  args: {
    label: 'Add Label Here',
  },
  decorators: [
    withBackgrounds,
    Story => (
      <ScrollView
        py={'vm'}
        flex={1}
        contentContainerStyle={{
          paddingBottom: 100,
          justifyContent: 'center',
          flexGrow: 1,
        }}
        px={'hm'}>
        <Text
          textAlign={'center'}
          variant={'header'}
          textDecorationLine={'underline'}>
          LinearProgressBar
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof LinearProgressBarMeta>;

// export const Default: story = {};

export const LinearProgress: StoryObj<typeof LinearProgressBarMeta> = {
  render: args => {
    const {colors} = useTheme<Theme>();
    return (
      <Box gap={'vxl'}>
        <Text color={'white'} variant={'headings'}>
          Linear Progress
        </Text>
        <LinearProgressBar
          backgroundColor={'#004f711A'}
          height={5}
          progress={30675}
          barColor={colors.momoBlue}
          title={'Yearly Account'}
          total={100000}
          //   unit={'Gh'}
        />
        <LinearProgressBar
          backgroundColor={'#004f711A'}
          height={5}
          progress={60}
          barColor={colors.sunshineYellow}
          title={'Monthly Account'}
          total={100}
          //   unit={'Gh'}
        />
        <LinearProgressBar
          backgroundColor={'#004f711A'}
          height={5}
          progress={50}
          barColor={colors.orange100}
          title={'Daily Account'}
          total={100}
          //   unit={'Gh'}
        />
      </Box>
    );
  },
};

export default LinearProgressBarMeta;
