import React from 'react';
import { View } from 'react-native';
import { MyButton } from './Button';
// import { Box } from '@/component/atom';
import { Box } from '../../../src/component/atom';

const MyButtonMeta = {
  title: 'MyButton',
  component: MyButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Hello world',
  },
  decorators: [
    (Story) => (
      <Box style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Story />
      </Box>
    ),
  ],
};

// export default MyButtonMeta;

// export const Basic = {};

// export const AnotherExample = {
//   args: {
//     text: 'Another example',
//   },
// };
