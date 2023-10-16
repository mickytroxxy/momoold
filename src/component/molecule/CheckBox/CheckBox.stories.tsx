import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import CheckBox from './CheckBox';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Text} from '../../atom';
// import { Box, Text } from '@/component/atom';

const CheckBoxMeta: Meta<typeof CheckBox> = {
  title: 'Controls/CheckBox',
  component: CheckBox,
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
          CheckBox
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof CheckBoxMeta>;

// export const Default: story = {};

export const Checkbox: StoryObj<typeof CheckBoxMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'black'} variant={'headings'}>
            Disable in Action
          </Text>
          <CheckBox
            {...args}
            checked={checked}
            onChange={() => setchecked(v => !v)}
          />
        </Box>
      </Box>
    );
  },
};

export const CheckboxWithLabel: StoryObj<typeof CheckBoxMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'black'} variant={'headings'}>
            Without Label
          </Text>
          <CheckBox
            checked={checked}
            onChange={() => setchecked(v => !v)}
            {...args}
          />
        </Box>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'black'} variant={'headings'}>
            With Label
          </Text>
          <CheckBox
            checked={checked}
            onChange={() => setchecked(v => !v)}
            label="UnChecked"
            {...args}
          />
        </Box>
      </Box>
    );
  },
};
export default CheckBoxMeta;
