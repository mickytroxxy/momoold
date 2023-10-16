import { Box, ScrollView, Text } from '@/component/atom';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { Meta, StoryObj } from '@storybook/react-native';
import BottomTabs from './BottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '@/typings/navigation';

const RootStack = createNativeStackNavigator<RootStackParams>();

const BottomTabMeta: Meta<typeof BottomTabs> = {
  title: 'BottomTab',
  component: BottomTabs,
  decorators: [
    withBackgrounds,
    Story => (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Main" component={BottomTabs} />
      </RootStack.Navigator>
    ),
  ],
};

type story = StoryObj<typeof BottomTabMeta>;

// export const Default: story = {};

export const BottomTab: StoryObj<typeof BottomTabMeta> = {
  render: args => {
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'white'} variant={'headings'}>
            BottomTabsss
          </Text>
        </Box>
      </Box>
    );
  },
};

export default BottomTabMeta;
