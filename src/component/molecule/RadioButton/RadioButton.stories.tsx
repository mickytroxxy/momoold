import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import RadioButtonComp from './RadioButton';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Text} from '../../atom';
// import { Box, Text } from '@/component/atom';

const RadioButtonMeta: Meta<typeof RadioButtonComp> = {
  title: 'Controls/RadioButton',
  component: RadioButtonComp,
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
          variant={'storyHead'}
          mb={'vxl'}
          textDecorationLine={'underline'}>
          Radio Button
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof RadioButtonMeta>;

// export const Default: story = {};

export const SingleOption: StoryObj<typeof RadioButtonMeta> = {
  render: args => {
    const options = [{label: 'Option1'}];
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption1, setSelectedOption1] = useState(null);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text variant={'storyHead'}>Disable in Action</Text>
          <RadioButtonComp
            {...args}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </Box>
      </Box>
    );
  },
};

export const MultipleOptions: StoryObj<typeof RadioButtonMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    const options = [
      {label: 'Option 1'},
      {label: 'Option 2'},
      {label: 'Option 3'},
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'white'} variant={'headings'}>
            Checked
          </Text>
          <RadioButtonComp
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </Box>
      </Box>
    );
  },
};

export const OptionLabel: StoryObj<typeof RadioButtonMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    // const options = ['Option 1', 'Option 2', 'Option 3'];
    const options = [
      {label: 'Option 1'},
      {label: 'Option 2'},
      {label: 'Option 3'},
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    return (
      <Box gap={'vxl'}>
        {/* <Box gap={'vxs'} alignItems={'center'}> */}
        <Box gap={'hl'}>
          <RadioButtonComp
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            showLabel
            containerStyle={{
              flexDirection: 'column',
            }}
          />
        </Box>
      </Box>
    );
  },
};

export default RadioButtonMeta;
