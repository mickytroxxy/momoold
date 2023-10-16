import { Box, ScrollView, Text } from '@/component/atom';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { Meta, StoryObj } from '@storybook/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '@/typings/navigation';
import DrawerNavigator from './DrawerNavigator';

const RootStack = createNativeStackNavigator<RootStackParams>();

const DrawerMeta: Meta<typeof DrawerNavigator> = {
  title: 'Drawer',
  component: DrawerNavigator,
  decorators: [
    withBackgrounds,
    Story => (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name="Main" component={DrawerNavigator} />
      </RootStack.Navigator>
    ),
  ],
};

type story = StoryObj<typeof DrawerMeta>;

// export const Default: story = {};

export const Drawer: story = {
  render: args => {
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'white'} variant={'headings'}>
            DrawerNavigators
          </Text>
        </Box>
      </Box>
    );
  },
};

export default DrawerMeta;
