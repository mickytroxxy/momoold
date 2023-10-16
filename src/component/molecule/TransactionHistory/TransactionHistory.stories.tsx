import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import TransactionHist from './index';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Text} from '../../atom';
import {historyData} from '@/fixtures/dummyData';
// import { Box, Text } from '@/component/atom';

const TransactionHistMeta: Meta<typeof TransactionHist> = {
  title: 'Controls/TransactionHist',
  component: TransactionHist,
  argTypes: {
    disabled: {
      label: 'disabled',
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    withBackgrounds,
    Story => (
      <Box
        py={'vm'}
        flex={1}
        // contentContainerStyle={{
        //   paddingBottom: 100,
        //   justifyContent: 'center',
        //   flexGrow: 1,
        // }}
        px={'hm'}>
        <Text
          textAlign={'center'}
          variant={'header'}
          mb={'vxl'}
          textDecorationLine={'underline'}>
          TransactionHist
        </Text>
        <Story />
      </Box>
    ),
  ],
};

type story = StoryObj<typeof TransactionHistMeta>;

// export const Default: story = {};

export const TransactionHistory: StoryObj<typeof TransactionHistMeta> = {
  render: args => {
    return (
      <Box gap={'vxl'}>
        <Box gap={'vl'}>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Transaction History
            </Text>
            <TransactionHist historyData={historyData} />
          </Box>
        </Box>
      </Box>
    );
  },
};

export default TransactionHistMeta;
