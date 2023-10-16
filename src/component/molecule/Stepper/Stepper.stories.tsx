import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useRef, useState} from 'react';
import Steppers from './Stepper';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Button, Text} from '../../atom';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import {FlatList, StyleSheet} from 'react-native';
// import { Box, Text } from '@/component/atom';

const StepperMeta: Meta<typeof Steppers> = {
  title: 'Controls/Stepper',
  component: Steppers,
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
          paddingHorizontal: 20,
        }}
        // px={'hm'}
      >
        <Text
          textAlign={'center'}
          variant={'header'}
          mb={'vxl'}
          textDecorationLine={'underline'}>
          Stepper
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof StepperMeta>;

// export const Default: story = {};

export const Stepper3: StoryObj<typeof StepperMeta> = {
  render: args => {
    const {colors} = useTheme<Theme>();
    const [sindex, setSindex] = useState(0);
    const fRef = useRef<FlatList>(null);
    return (
      <Box gap={'vxl'}>
        <Box
          style={{
            // ...StyleSheet.absoluteFillObject,
            // flexDirection: 'row',
            paddingTop: 10,
            // backgroundColor: "green"
            // justifyContent: 'space-between',
          }}>
          <Steppers segments={3} progress={sindex} />
        </Box>

        <Box mt={'vxl'} alignSelf={'center'}>
          <Button
            onPress={() => {
              if (sindex >= 2) return;

              setSindex(v => v + 1);
            }}
            label="NEXT"
            variant="primary"
          />
        </Box>
      </Box>
    );
  },
};
export const Stepper4: StoryObj<typeof StepperMeta> = {
  render: args => {
    const {colors} = useTheme<Theme>();
    const [sindex, setSindex] = useState(0);
    const fRef = useRef<FlatList>(null);
    return (
      <Box gap={'vxl'}>
        <Box
          style={{
            ...StyleSheet.absoluteFillObject,
            flexDirection: 'row',
            paddingTop: 10,
            justifyContent: 'space-between',
            // zIndex: -5,
          }}>
          <Steppers segments={4} progress={sindex} />
        </Box>

        <Box mt={'vxl'} alignSelf={'center'}>
          <Button
            onPress={() => {
              if (sindex >= 3) return;
              setSindex(v => v + 1);
            }}
            label="NEXT"
            variant="primary"
          />
        </Box>
      </Box>
    );
  },
};
export const Stepper5: StoryObj<typeof StepperMeta> = {
  render: args => {
    const {colors} = useTheme<Theme>();
    const [sindex, setSindex] = useState(0);
    const fRef = useRef<FlatList>(null);
    return (
      <Box gap={'vxl'}>
        <Box pt={'vxs'}>
          <Steppers segments={5} progress={sindex} />
        </Box>

        <Box mt={'vxl'} alignSelf={'center'}>
          <Button
            onPress={() => {
              if (sindex >= 4) return;
              setSindex(v => v + 1);
            }}
            label="NEXT"
            variant="primary"
          />
        </Box>
      </Box>
    );
  },
};

export default StepperMeta;
