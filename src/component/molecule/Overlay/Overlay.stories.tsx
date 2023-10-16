import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import OverlayComp from './';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Button, Text} from '../../atom';
// import { Box, Text } from '@/component/atom';

const OverlayMeta: Meta<typeof OverlayComp> = {
  title: 'Controls/Overlay',
  component: OverlayComp,
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
          mb={'vxl'}
          textDecorationLine={'underline'}>
          Overlay
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof OverlayMeta>;

// export const Default: story = {};

export const Overlay: StoryObj<typeof OverlayMeta> = {
  render: args => {
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Box justifyContent={'center'}>
            <Button
              onPress={toggleModal}
              label={'Open Overlay'}
              variant="primary"
            />
          </Box>
          <OverlayComp open={isModalVisible} setModalVisible={setModalVisible}>
            <Box
              flex={1}
              px={'hm'}
              pb={'vxl'}
              justifyContent={'center'}
              alignItems={'center'}>
              <Text variant={'storyHead'}>Testing this out</Text>
            </Box>
          </OverlayComp>
        </Box>
      </Box>
    );
  },
};

export default OverlayMeta;
