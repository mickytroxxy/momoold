import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import Box from '../../atom/Box';
import ScrollView from '../../atom/ScrollView';
import ToggleSwitch from './ToggleSwitch';
// import ToggleSwitch from './ToggleSwitchStory';
import {Text} from '@/component/atom';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';

const ToggleSwitchMeta: Meta<typeof ToggleSwitch> = {
  title: 'ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
    disabled: {
      label: 'disabled',
      control: {
        type: 'boolean',
      },
    },
  },
  // args: {
  //   label: 'Add Label Here',
  // },
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
          ToggleS  Witches
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof ToggleSwitchMeta>;

// export const Default: story = {};

export const Default: StoryObj<typeof ToggleSwitchMeta> = {
  render: args => {
    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);

    const press2 = () => {
      setActive1(v => !v);
    };
    const press1 = () => {
      setActive1(v => !v);
    };
    const press = () => {
      setActive(v => !v);
    };
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxl'} alignItems={'center'}>
          <Text color={'white'} variant={'headings'}>
            Switch Off
          </Text>
          <Box gap={'vm'} alignItems={'center'}>
            <Text fontSize={19} color={'black'}>
              Disable Switch in Action{' '}
            </Text>
            <ToggleSwitch {...args} active={active} onPress={() => press()} />
          </Box>
        </Box>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'white'} variant={'headings'}>
            Switch On
          </Text>
          <ToggleSwitch active={active1} onPress={() => press1()} />
        </Box>
      </Box>
    );
  },
};

export const LabelledToggleSwitch: StoryObj<typeof ToggleSwitchMeta> = {
  render: args => {
    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);

    const press = () => {
      setActive(v => !v);
    };
    const press1 = () => {
      setActive1(v => !v);
    };
    return (
      <Box gap={'vxl'} px={'hxl'}>
        <Box gap={'vxs'} px={'hxl'}>
          <Text textAlign={'center'} color={'black'} variant={'headings'}>
            Switch On
          </Text>
          <ToggleSwitch
            label="My Switch"
            active={active}
            onPress={() => press()}
            {...args}
          />
        </Box>
        <Box gap={'vxs'} px={'hxl'}>
          <Text textAlign={'center'} color={'black'} variant={'headings'}>
            Switch off
          </Text>
          <ToggleSwitch
            label="Your Switch"
            active={active1}
            onPress={() => press1()}
            {...args}
          />
        </Box>
      </Box>
    );
  },
};

// export const Grouped: StoryObj<typeof ToggleSwitchMeta> = {
//   render: args => (
//     <Box gap={'vxl'}>
//       <Box gap={'vxs'} alignItems={'center'}>
//         <Text color={'white'} variant={'headings'}>
//           Without Labels
//         </Text>
//         <ToggleSwitch active={true} />
//         <ToggleSwitch active={false} />
//       </Box>
//       <Box gap={'vxs'} alignItems={'center'}>
//         <Text color={'white'} variant={'headings'}>
//           With Labels
//         </Text>
//         <ToggleSwitch active={false} {...args} />
//         <ToggleSwitch active={true} {...args} />
//       </Box>
//     </Box>
//   ),
// };
export default ToggleSwitchMeta;
