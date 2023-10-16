import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React from 'react';
import AccordionComp from './Accordion';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import { Box, Text } from '../../atom';
// import { Box, Text } from '@/component/atom';

const AccordionMeta: Meta<typeof AccordionComp> = {
  title: 'Accordion',
  component: AccordionComp,
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
        // px={'hm'}
        >
        <Text
          textAlign={'center'}
          variant={'header'}
          mb={'vxl'}
          textDecorationLine={'underline'}>
          Accordion
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof AccordionMeta>;

// export const Default: story = {};

export const Accordion: StoryObj<typeof AccordionMeta> = {
  render: args => (
    <Box gap={'vxl'}>
      <Box gap={'vxs'} alignItems={'center'}>
        <AccordionComp  />
      </Box>
  
    </Box>
  ),
};

export default AccordionMeta;
