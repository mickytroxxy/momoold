import icon from '@/constants/icon';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import {Box, ScrollView, Text} from '../../atom';
import CurvedHeader from './CurvedHeader';
import TopHeaderContent from './TopHeaderContent';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {Platform} from 'react-native';
import CurvedHeaderBg from './CurvedHeaderBg';
import {moderateScale} from 'react-native-size-matters';
import Card from '@molecule/Card/Card';
import BalanceHeader from '@molecule/Card/BalanceHeader';
import HorizontalCardSeparator from '@molecule/Card/HorizontalCardSeparator';
import BalanceFooter from '@molecule/Card/BalanceFooter';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import LinearTab from '@molecule/Tab/LinearTab';
// import { Box, Text } from '@/component/atom';

const {NotifIcon, PersonroundIcon, MomoIcon, BackIcon, NotifoutlineIcon} = icon;

const CurvedHeaderMeta: Meta<typeof CurvedHeader> = {
  title: 'CurvedHeader',
  component: CurvedHeader,
  // args: {
  //   label: 'Add Label Here',
  // },
  decorators: [
    withBackgrounds,
    Story =>
      Platform.select({
        ios: <Story />,
        android: (
          <SafeAreaContainer>
            <Story />
          </SafeAreaContainer>
        ),
      }),
  ],
};

type story = StoryObj<typeof CurvedHeaderMeta>;

// export const Default: story = {};

export const Header: StoryObj<typeof CurvedHeaderMeta> = {
  render: args => (
    <Box flex={1}>
      {/* <CurvedHeader height={512} diameter={777} /> */}
      <Box flex={0.44}>
        {/* <CurvedHeaderBg /> */}
        <CurvedHeaderBg>
          {/* <Text fontSize={26}>lossjj</Text> */}
        </CurvedHeaderBg>
      </Box>
    </Box>
  ),
};
// #FFCB05
export const HeaderWithIcon: StoryObj<typeof CurvedHeaderMeta> = {
  render: args => (
    <Box flex={1}>
      {/* <CurvedHeader height={512} diameter={777} /> */}
      <Box flex={0.44}>
        <CurvedHeaderBg>
          <TopHeaderContent
            containerStyle={{paddingVertical: moderateScale(13)}}
            right={{rightComp: <NotifoutlineIcon width={24} height={24} />}}
            left={{
              leftComp: <BackIcon color={'#fff'} width={24} height={24} />,
            }}
            title="Headings"
            titleStyle={{
              color: '#fff',
              fontSize: moderateScale(16),
              lineHeight: moderateScale(24),
            }}
          />
        </CurvedHeaderBg>
      </Box>
    </Box>
  ),
};

export const HeaderWithIcon1: StoryObj<typeof CurvedHeaderMeta> = {
  render: args => (
    <Box flex={1}>
      {/* <CurvedHeader height={512} diameter={777} /> */}
      <Box flex={0.44}>
        <CurvedHeaderBg>
          <TopHeaderContent
            containerStyle={{
              paddingVertical: moderateScale(13),
              alignItems: 'flex-start',
            }}
            right={{rightComp: <NotifoutlineIcon width={24} height={24} />}}
            left={{
              leftComp: <PersonroundIcon width={24} height={24} />,
            }}
            center={{centerComp: <MomoIcon width={40} height={40} />}}
            title="Headings"
            titleStyle={{
              color: '#FFCB05',
            }}
          />
        </CurvedHeaderBg>
        <Text pt={'vxl'}>1</Text>
      </Box>
    </Box>
  ),
};

export const HeaderWithIconCard: StoryObj<typeof CurvedHeaderMeta> = {
  render: args => {
    const {colors} = useTheme<Theme>();
    const {InfoCardIcon} = icon;
    const [showBalance1, setshowBalance1] = useState(false);
    const toggleBalance1 = () => {
      setshowBalance1(v => !v);
    };
    return (
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
        {/* <CurvedHeader height={512} diameter={777} /> */}
        <Box flex={0.44}>
          <CurvedHeaderBg>
            <TopHeaderContent
              containerStyle={{
                paddingVertical: moderateScale(13),
                alignItems: 'flex-start',
              }}
              right={{rightComp: <NotifoutlineIcon width={24} height={24} />}}
              left={{
                leftComp: <PersonroundIcon width={24} height={24} />,
              }}
              center={{centerComp: <MomoIcon width={40} height={40} />}}
              title="Headings"
              titleStyle={{
                color: '#FFCB05',
              }}
            />
          </CurvedHeaderBg>
          {/* 1 Action with Icon */}
          <Box px={'hm'}>
            <Card
              variant={'shadow'}
              style={{
                // marginTop:"-25%",
                marginTop: '-30%',
              }}>
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
                    label="Statements"
                    icon={
                      <InfoCardIcon
                        stroke={colors.momoBlue}
                        // fill={colors.momoBlue}
                        width={24}
                        height={24}
                      />
                    }
                  />
                </Box>
              </Box>
            </Card>
          </Box>
          <Box mt={'vm'} width={'100%'}>
            <LinearTab />
          </Box>

          <Text pt={'vxl'}>1</Text>
        </Box>
      </ScrollView>
    );
  },
};

export default CurvedHeaderMeta;
