import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import {Box, Text} from '../../atom';
import ScrollView from '../../atom/ScrollView';
import Card from './Card';
// import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import icon from '@/constants/icon';
import bannerData from '@/fixtures/bannerData';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import BalanceFooter from './BalanceFooter';
import BalanceHeader from './BalanceHeader';
import Banner2 from './Banner2';
import Bundle from './Bundle';
import {CardContent1, CardContent2} from './CardContent1';
import HBalance from './HBalance';
import HorizontalCardSeparator from './HorizontalCardSeparator';
import MenuComp from './MenuContent';
import QuickAction from './QuickAction';
import {VerticalSeparator} from './VerticalSeparator';
import {
  cardsMenuHeight,
  cardsMenuWidth,
} from '@/style-dictionary-dist/momoStyle';
import {gpsh, gpsw} from '@/utils/parseTokenStyle';
import Menu from './Menu';
// import { Box, Text } from '@/component/atom';

const CardMeta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  args: {
    // label: 'Add Label Here',
    // va
  },
  decorators: [
    withBackgrounds,
    Story => (
      <ScrollView
        py={'vm'}
        flex={1}
        bg={'extraLightGrey'}
        contentContainerStyle={{
          paddingBottom: 100,
          justifyContent: 'center',
          //   backgroundColor: "red"
        }}
        // px={'hm'}
      >
        <Text
          textAlign={'center'}
          variant={'header'}
          mb={'vl'}
          textDecorationLine={'underline'}>
          Cards
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof CardMeta>;

// export const Default: story = {};

export const BaseCards: StoryObj<typeof CardMeta> = {
  render: args => (
    <Box gap={'vxl'} bg={'extraLightGrey'} px={'hs'}>
      <Box gap={'vxs'} alignItems={'center'}>
        <Text color={'sunshineYellow'} variant={'headings'}>
          No Shadow
        </Text>
        <Card height={110} />
      </Box>
      <Box bg={'extraLightGrey'} gap={'vxs'} alignItems={'center'}>
        <Text color={'sunshineYellow'} variant={'headings'}>
          Shadow
        </Text>
        <Card variant={'shadow'} height={110} />
      </Box>
    </Box>
  ),
};

export const Balance: StoryObj<typeof CardMeta> = {
  render: args => {
    const {colors} = useTheme<Theme>();
    const {InfoCardIcon} = icon;
    const [showBalance, setshowBalance] = useState(false);
    const toggleBalance = () => {
      setshowBalance(v => !v);
    };
    const [showBalance1, setshowBalance1] = useState(false);
    const toggleBalance1 = () => {
      setshowBalance1(v => !v);
    };
    return (
      <Box px={'hm'} flex={1} pt={'vm'} gap={'vxl'} bg={'extraLightGrey'}>
        {/* 2 Actions no Icon */}
        <Card variant={'shadow'}>
          <Box borderRadius={10} overflow={'hidden'}>
            {/* TOP */}
            <BalanceHeader
              showBalance={showBalance}
              toggleBalance={toggleBalance}
              phoneNumber="097 123 4567"
              balnce="FCFA 150 000 000 000"
            />
            <HorizontalCardSeparator />
            {/* BOTTOM */}
            <Box flexDirection={'row'}>
              <BalanceFooter label="Action 1" />
              <VerticalSeparator mv={2} />
              <BalanceFooter label="Action 2" />
            </Box>
          </Box>
        </Card>
        {/* 2 Actions with Icon */}
        <Card variant={'shadow'}>
          <Box borderRadius={10} overflow={'hidden'}>
            {/* TOP */}
            <BalanceHeader
              showBalance={showBalance}
              toggleBalance={toggleBalance}
              phoneNumber="097 123 4567"
              balnce="FCFA 150 000 000 000"
            />
            <HorizontalCardSeparator w={0.5} />
            {/* BOTTOM */}
            <Box flexDirection={'row'}>
              <BalanceFooter
                label="Action 1"
                icon={
                  <InfoCardIcon
                    stroke={colors.momoBlue}
                    // fill={colors.momoBlue}
                    width={getFontSizeByWindowWidth(18)}
                    height={getFontSizeByWindowHeight(18)}
                  />
                }
              />
              <VerticalSeparator mv={2} />
              <BalanceFooter
                label="Action 2"
                icon={
                  <InfoCardIcon
                    stroke={colors.momoBlue}
                    width={getFontSizeByWindowWidth(18)}
                    height={getFontSizeByWindowHeight(18)}
                  />
                }
              />
            </Box>
          </Box>
        </Card>
        {/* 1 Action No Icon */}
        <Card variant={'shadow'}>
          <Box borderRadius={10} overflow={'hidden'}>
            {/* TOP */}
            <BalanceHeader
              showBalance={showBalance1}
              toggleBalance={toggleBalance1}
              phoneNumber="097 123 4567"
              balnce="FCFA 150 000 000 000"
            />
            <HorizontalCardSeparator />
            {/* BOTTOM */}
            <Box flexDirection={'row'}>
              <BalanceFooter label="Action 1" />
            </Box>
          </Box>
        </Card>
        {/* 1 Action with Icon */}
        <Card variant={'shadow'}>
          <Box borderRadius={10} overflow={'hidden'}>
            {/* TOP */}
            <BalanceHeader
              showBalance={showBalance1}
              toggleBalance={toggleBalance1}
              phoneNumber="097 123 4567"
              balnce="FCFA 150 000 000 000"
            />
            <HorizontalCardSeparator />
            {/* BOTTOM */}
            <Box flexDirection={'row'}>
              <BalanceFooter
                label="Action 1"
                icon={
                  <InfoCardIcon
                    stroke={colors.momoBlue}
                    width={getFontSizeByWindowWidth(18)}
                    height={getFontSizeByWindowHeight(18)}
                  />
                }
              />
            </Box>
          </Box>
        </Card>
        <Card
          variant={'shadow'}
          borderTopLeftRadius={0}
          borderTopRightRadius={0}>
          <Box borderRadius={10} overflow={'hidden'}>
            {/* TOP */}
            <Box flexDirection={'row'} bg={'white'}>
              <HBalance title1="Airtime" title2="FCFA 200" />
              <VerticalSeparator mt={26} mb={10} />
              <HBalance title1="Data" title2="30.2 GB" />
            </Box>
            <HorizontalCardSeparator />
            {/* BOTTOM */}
            <BalanceFooter label=" View all balances" />
          </Box>
        </Card>
      </Box>
    );
  },
};

export const Menus: StoryObj<typeof CardMeta> = {
  render: args => {
    return (
      <Box flex={1} pt={'vm'} px={'hm'} gap={'vxl'} bg={'extraLightGrey'}>
        <Menu>
          <MenuComp label="item one" />
        </Menu>
        {/* <Menu>
          <MenuContent/>
        </Menu> */}
        <Card
          flexDirection={'row'}
          style={{paddingVertical: getFontSizeByWindowHeight(16)}}>
          <MenuComp label="item one" />
          <VerticalSeparator />
          <MenuComp label="item two" />
        </Card>
        <Card
          flexDirection={'row'}
          px={'hs'}
          style={{paddingVertical: getFontSizeByWindowHeight(16)}}>
          <MenuComp label="item one" />
          <VerticalSeparator />
          <MenuComp label="item two" />
          <VerticalSeparator />
          <MenuComp label="item three" />
        </Card>
      </Box>
    );
  },
};

export const TabCards: StoryObj<typeof CardMeta> = {
  render: args => {
    const tabData = ['MoMo', 'ADVANCE', 'MTN'];
    const [tabIndex, setTabIndex] = useState(0);
    const toggleTab = (index: number) => {
      setTabIndex(index);
    };
    function renderHeader() {
      return (
        <Box
          flexDirection={'row'}
          // flex={1}
          // py={'vm'}
          pt={'vxxs'}
          bg={'extraLightGrey'}
          justifyContent={'space-between'}
          borderTopLeftRadius={getFontSizeByWindowWidth(9)}
          borderTopRightRadius={getFontSizeByWindowWidth(9)}
          px={'hm'}>
          {tabData.map((v, i) => (
            <TouchableOpacity
              key={v}
              onPress={() => toggleTab(i)}
              activeOpacity={0.7}
              flex={1}
              // bg={'red100'}
              // style={[i !== 1 && {flex: 1}]}
              justifyContent={'center'}
              alignItems={
                i === 0 ? 'flex-start' : i === 1 ? 'center' : 'flex-end'
              }>
              <Box gap={'vsm'}>
                <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'}>
                  {v}
                </Text>
                <Box
                  borderTopLeftRadius={6}
                  borderTopRightRadius={6}
                  height={getFontSizeByWindowHeight(4)}
                  bg={i === tabIndex ? 'sunshineYellow' : 'transparent'}
                  // width={'100%'}
                  // flex={1}
                />
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      );
    }
    return (
      <Box gap={'vxl'} bg={'white'} px={'hs'} pb={'hxl'}>
        <Box gap={'vxl'} alignItems={'center'}>
          <Text color={'sunshineYellow'} variant={'headings'}>
            Tabs
          </Text>
          <Card
            variant={'shadow'}
            // borderTopLeftRadius={0}
            // borderTopRightRadius={0}
          >
            {renderHeader()}
            {/* <Box height={getFontSizeByWindowWidth(94)}> */}
            {tabIndex === 0 && <CardContent1 />}
            {tabIndex === 1 && <CardContent2 />}
            {tabIndex === 2 && <CardContent1 />}
            {/* </Box> */}
          </Card>
        </Box>
      </Box>
    );
  },
};
export const Banners: StoryObj<typeof CardMeta> = {
  render: args => {
    return (
      <Box px={'hs'} flex={1} pt={'vm'} gap={'vxl'} bg={'extraLightGrey'}>
        {/* <Text variant={'header'} >Single Banner</Text>
        <Banner data={bannerData.slice(0, 1)} />
        <Text variant={'header'} >Multiple Banner</Text>
        <Banner data={bannerData} /> */}
        <Text variant={'header'}>Single Banner</Text>
        <Banner2 data={bannerData.slice(0, 1)} />
        <Text variant={'header'}>Multiple Banner</Text>
        <Banner2 data={bannerData} />
      </Box>
    );
  },
};
export const DataBundle: StoryObj<typeof CardMeta> = {
  render: args => {
    return (
      <Box px={'hm'} flex={1} pt={'vm'} gap={'vxl'} bg={'extraLightGrey'}>
        <Text variant={'storyHead'} textAlign={'center'}>
          Data Bundles
        </Text>
        <Bundle
          type="500 MB Data Bundle"
          validity="30"
          amount="₦ 4 000"
          durationType="Monthly"
        />
        <Bundle
          type="500 MB Data Bundle"
          validity="7"
          amount="₦ 4 000"
          durationType="Weekly"
        />
        <Bundle
          type="500 MB Data Bundle"
          validity="1"
          amount="₦ 4 000"
          durationType="Daily"
        />
        <Bundle
          type="500 MB Data Bundle"
          validity="1"
          amount="₦ 4 000"
          durationType="Daily"
          specialOffer
        />
      </Box>
    );
  },
};

export const SmsBundle: StoryObj<typeof CardMeta> = {
  render: args => {
    return (
      <Box px={'hm'} flex={1} pt={'vm'} gap={'vxl'} bg={'extraLightGrey'}>
        <Text variant={'storyHead'} textAlign={'center'}>
          Data Bundles
        </Text>
        <Bundle
          type="Unlimited SMS"
          validity="30"
          amount="₦ 4 000"
          durationType="Monthly"
        />
        <Bundle
          type="Unlimited SMS"
          validity="7"
          amount="₦ 4 000"
          durationType="Weekly"
        />
        <Bundle
          type="Unlimited SMS"
          validity="1"
          amount="₦ 4 000"
          durationType="Daily"
        />
        <Bundle
          type="Unlimited SMS"
          validity="1"
          amount="₦ 4 000"
          durationType="Daily"
          specialOffer
        />
      </Box>
    );
  },
};

export const WhatsappBundle: StoryObj<typeof CardMeta> = {
  render: args => {
    return (
      <Box px={'hm'} flex={1} pt={'vm'} gap={'vxl'} bg={'extraLightGrey'}>
        <Text variant={'storyHead'} textAlign={'center'}>
          Data Bundles
        </Text>
        <Bundle
          type="Unlimited SMS | 500 MB Whssssssssss"
          validity="30"
          amount="₦ 4 000"
          durationType="Monthly"
          typeTextStyle={{
            fontSize: getFontSizeByWindowWidth(12),
            lineHeight: getFontSizeByWindowHeight(15.6),
          }}
        />
        <Bundle
          type="Unlimited SMS | 500 MB Whatsapp"
          validity="7"
          amount="₦ 4 000"
          durationType="Weekly"
          typeTextStyle={{
            fontSize: getFontSizeByWindowWidth(12),
            lineHeight: getFontSizeByWindowHeight(15.6),
          }}
        />
        <Bundle
          type="Unlimited SMS | 500 MB Whatsapp"
          validity="1"
          amount="₦ 4 000"
          durationType="Daily"
          typeTextStyle={{
            fontSize: getFontSizeByWindowWidth(12),
            lineHeight: getFontSizeByWindowHeight(15.6),
          }}
        />
        <Bundle
          type="Unlimited SMS | 500 MB Whatsapp"
          validity="1"
          amount="₦ 4 000"
          durationType="Daily"
          typeTextStyle={{
            fontSize: getFontSizeByWindowWidth(12),
            lineHeight: getFontSizeByWindowHeight(15.6),
          }}
          specialOffer
        />
      </Box>
    );
  },
};

export const WandaBundle: StoryObj<typeof CardMeta> = {
  render: args => {
    return (
      <Box px={'hm'} flex={1} pt={'vm'} gap={'vxl'} bg={'extraLightGrey'}>
        <Text variant={'storyHead'} textAlign={'center'}>
          Data Bundles
        </Text>
        <Bundle type="1 GB Data Bundle" validity="30" amount="₦ 4 000" />
        <Bundle type="1 GB Data Bundle" validity="7" amount="₦ 4 000" />
        <Bundle type="1 GB Data Bundle" validity="3" amount="₦ 4 000" />
        <Bundle type="1 GB Data Bundle" validity="2" amount="₦ 4 000" />
      </Box>
    );
  },
};

export const QuickActions: StoryObj<typeof CardMeta> = {
  render: args => {
    const {colors, spacing} = useTheme<Theme>();
    const {SettingsIcon} = icon;
    return (
      <Box px={'hm'} flex={1} pt={'vm'} gap={'vl'} bg={'extraLightGrey'}>
        <Text variant={'storyHead'} textAlign={'center'}>
          Quick Action
        </Text>
        <QuickAction title="Pulse bundles" bg="colored" />
        <QuickAction
          title="Pulse bundles"
          subtitle="Pulse bundles"
          bg="colored"
        />
        <QuickAction
          icon={<SettingsIcon color={colors.sunshineYellow} />}
          title="Pulse bundles"
          subtitle="Pulse bundles"
          bg="colored"
        />
        <QuickAction
          icon={<SettingsIcon color={colors.momoBlue} />}
          title="Pulse bundles"
          subtitle="Pulse bundles"
          bg="white"
        />
        <QuickAction disabled title="Pulse bundles" bg="colored" />
        <QuickAction title="Pulse bundles" />
        <QuickAction title="Pulse bundles" subtitle="Pulse bundles" />
      </Box>
    );
  },
};

export default CardMeta;
