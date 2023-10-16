import {Meta, StoryObj} from '@storybook/react-native';
import React from 'react';
import ScrollView from '../ScrollView';
import Button from './Button';

type ButtonMetaType = Meta<typeof Button>;

const ButtonMeta: ButtonMetaType = {
  title: 'Button',
  component: Button,
  argTypes: {
    onPress: {action: 'pressed the button'},
    variant: {
      label: 'Variant',
      control: {
        label: 'Variant',
        type: 'radio',
        labels: {
          primary: 'Primary',
          secondary: 'Secondary',
          tertiary: 'Tertiary',
        },
      },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      label: 'Size',
      control: {
        type: 'select',
        labels: {
          extraSmall: 'ExtraSmall',
          small: 'Small',
          medium: 'Medium',
          fullWidth: 'FullWidth',
        },
      },
      options: ['extraSmall', 'small', 'medium', 'fullWidth'],
    },
    disabled: {
      label: 'disabled',
      control: {
        type: 'boolean',
      },
    },
    label: {
      label: 'Label', // <---------
    },
  },
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'fullWidth',
  },

  decorators: [
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
        <Story />
      </ScrollView>
    ),
  ],
};

type storyType = StoryObj<(typeof ButtonMeta)['args']>;

export const Primary: storyType = {};

export const Secondary: storyType = {
  args: {
    variant: 'secondary',
    label: 'Secondary',
  },
  render: args => (
    // @ts-ignore
    <Button {...args} />
    // {/* <TouchableOpacity
    //   style={{
    //     backgroundColor: 'red100',
    //     marginTop: 10,
    //     borderRadius: 30,
    //     height: 60,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    //   <Text>sbhshjshj</Text>
    // </TouchableOpacity> */}
  ),
};

export const Tertiary: storyType = {
  args: {
    variant: 'tertiary',
    size: 'fullWidth',
    label: 'Tertiary',
  },
  // @ts-ignore
  render: args => <Button {...args} />,
};

export default ButtonMeta;
