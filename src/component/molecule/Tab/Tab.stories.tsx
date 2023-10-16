import {Meta, StoryObj} from '@storybook/react-native';
import Tab from './Tab';
import {Box, Button, Icon, ScrollView, Text} from '@/component/atom';
import useCountdown from '@/hooks/useCountDown';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import LTab from './LTab';
import LinearTab from './LinearTab';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import Menu from '../Card/Menu';
import MenuContent from '../Card/MenuContent';
import VerticalSeparator from '../Card/VerticalSeparator';
import Card from '../Card/Card';
import {Image} from 'react-native';
import {bannerImage} from '@/constants/images';

const {recmomobanner} = bannerImage;

const TabMeta: Meta<typeof Tab> = {
  title: 'Tab',
  component: Tab,
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
          Tabs
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof TabMeta>;

// export const Default: story = {};
const tabData = [
  {
    title: 'Tab 1',
    renderScene: () => (
      <Box width={'100%'} bg={'green100'} pt={'vl'} height={100}>
        <Text>You don't like this right</Text>
      </Box>
    ),
  },
  {
    title: 'Tab 2',
    renderScene: () => (
      <Box height={100}>
        <Text>You don't like this left</Text>
      </Box>
    ),
  },
  {
    title: 'Tab 3',
    renderScene: () => (
      <Box height={100}>
        <Text>but you like it center </Text>
      </Box>
    ),
  },
];

export const linearTabData = [
  {
    title: 'FOR YOU',
    renderScene: () => (
      <Box py={'vs'} gap={'vs'} flex={1} bg={'extraLightGrey'} px={'hm'}>
        <Menu>
          <MenuContent
            icon={<Icon name="MomotransferIcon" size={24} />}
            label="MoMo transfer"
          />
          <VerticalSeparator />
          <MenuContent
            icon={<Icon name="BillsIcon" size={24} />}
            label="Bills"
          />
        </Menu>
        <Card
          bg={'white'}
          flexDirection={'row'}
          style={{paddingVertical: getFontSizeByWindowHeight(16)}}>
          <MenuContent
            icon={<Icon name="DatabundlesIcon" size={24} />}
            label="Data Bundles"
          />
          <VerticalSeparator />
          <MenuContent
            // icon={<Icon name="AirtimeIcon" size={24}  />}
            icon={<Icon name="BillsIcon" size={24} />}
            label="Airtime"
          />
        </Card>
        <Box
          // height={getFontSizeByWindowWidth(104)}
          height={104}
          borderRadius={16}
          overflow={'hidden'}
          alignItems={'center'}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={recmomobanner}
          />
        </Box>
      </Box>
    ),
  },
  {
    title: 'PAY',
    renderScene: () => (
      <Text color={'black'} variant={'headings'} lineHeight={36} fontSize={29}>
        LOVE
      </Text>
    ),
  },
  {
    title: 'RECHARGE',
    renderScene: () => (
      <Text color={'black'} variant={'headings'} lineHeight={36} fontSize={29}>
        HATE
      </Text>
    ),
  },
  {
    title: 'INSURE',
    renderScene: () => (
      <Text color={'black'} variant={'headings'} lineHeight={36} fontSize={29}>
        RELATIONSHIPS
      </Text>
    ),
  },
  // {title: 'RECssqHARGE'},
  // {title: 'RECHA42RGE'},
];

export const Tabs: StoryObj<typeof TabMeta> = {
  render: args => {
    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Text color={'white'} variant={'headings'}>
            Tabss
          </Text>
          <Box zIndex={-1} flex={1} width={'100%'}>
            <Tab mH={getFontSizeByWindowWidth(20)} gap={10} tabData={tabData} />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const LTabs: StoryObj<typeof TabMeta> = {
  render: args => {
    // const DURATION = 5000;
    const DURATION = 16000;
    const {start, formattedTime, reset, time} = useCountdown({
      callback: () => {},
      duration: DURATION,
    });
    const {spacing} = useTheme<Theme>();

    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Box width={'100%'}>
            <LTab />
          </Box>
        </Box>
      </Box>
    );
  },
};
export const AnimatedLTabs: StoryObj<typeof TabMeta> = {
  render: args => {
    // const DURATION = 5000;
    const DURATION = 16000;
    const {start, formattedTime, reset, time} = useCountdown({
      callback: () => {},
      duration: DURATION,
    });
    const {spacing} = useTheme<Theme>();

    return (
      <Box gap={'vxl'}>
        <Box gap={'vxs'} alignItems={'center'}>
          <Box width={'100%'}>
            <LinearTab tabData={linearTabData} />
          </Box>
        </Box>
      </Box>
    );
  },
};

export default TabMeta;
