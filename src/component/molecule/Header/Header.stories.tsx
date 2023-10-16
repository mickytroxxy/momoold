import icon from '@/constants/icon';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Meta, StoryObj} from '@storybook/react-native';
import React from 'react';
import {Box, Text} from '../../atom';
import Header from './Header';
import TopHeaderContent from './TopHeaderContent';
import {Platform} from 'react-native';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import {getFontSizeByWindowWidth} from '@/style/theme';
// import { Box, Text } from '@/component/atom';

const {
  NotifIcon,
  HeaderXIcon,
  NotifoutlineIcon,
  PersonroundIcon,
  MomoIcon,
  BackIcon,
} = icon;

const HeaderMeta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
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

type story = StoryObj<typeof HeaderMeta>;

// export const Default: story = {};

export const Default: StoryObj<typeof HeaderMeta> = {
  render: args => (
    <Header py={'vm'}>
      <TopHeaderContent right={{rightComp: <NotifIcon />}} title="Headings" />
    </Header>
  ),
};

export const HeaderWithIcon1: StoryObj<typeof HeaderMeta> = {
  render: args => (
    <Box gap={'vxl'}>
      <Header py={'vl'}>
        <TopHeaderContent
          right={{
            rightComp: (
              <HeaderXIcon
                width={getFontSizeByWindowWidth(16)}
                height={getFontSizeByWindowWidth(16)}
              />
            ),
          }}
          left={{
            leftComp: (
              <BackIcon
                color={'white'}
                width={getFontSizeByWindowWidth(16)}
                height={getFontSizeByWindowWidth(16)}
              />
            ),
          }}
          // left={{leftComp: <NotifIcon />}}
          // center={{centerComp: <NotifIcon />}}
          // title="Headings"
        />
      </Header>
      <Text variant={'headings'} textAlign={'center'} mt={'vxl'}>
        1
      </Text>
    </Box>
  ),
};

export const HeaderWithIcon2: StoryObj<typeof HeaderMeta> = {
  render: args => (
    <Box gap={'vxl'}>
      <Header py={'vm'}>
        <TopHeaderContent
          right={{
            rightComp: (
              <HeaderXIcon
                width={getFontSizeByWindowWidth(16)}
                height={getFontSizeByWindowWidth(16)}
              />
            ),
          }}
          left={{
            leftComp: (
              <BackIcon
                width={getFontSizeByWindowWidth(16)}
                height={getFontSizeByWindowWidth(16)}
                color={'white'}
              />
            ),
          }}
          title="Headings"
        />
      </Header>
    </Box>
  ),
};

export const HeaderWithIcon3: StoryObj<typeof HeaderMeta> = {
  render: args => (
    <Box gap={'vxl'}>
      <Header style={{paddingVertical: getFontSizeByWindowWidth(13)}}>
        <TopHeaderContent
          ph="sm"
          right={{
            rightComp: (
              <Box alignItems={'center'}>
                <NotifoutlineIcon
                  width={getFontSizeByWindowWidth(18)}
                  height={getFontSizeByWindowWidth(18)}
                />
                <Text
                  fontSize={getFontSizeByWindowWidth(8)}
                  color={'white'}
                  lineHeight={getFontSizeByWindowWidth(10.4)}
                  style={{gap: 2}}>
                  Notification
                </Text>
              </Box>
            ),
          }}
          left={{
            leftComp: (
              <Box alignItems={'center'} style={{gap: 2}}>
                <PersonroundIcon
                  width={getFontSizeByWindowWidth(18)}
                  height={getFontSizeByWindowWidth(18)}
                />
                <Text
                  lineHeight={getFontSizeByWindowWidth(10)}
                  // fontFamily={'MTNBrighterSans-Light'}
                  fontSize={getFontSizeByWindowWidth(8)}
                  color={'white'}>
                  Account
                </Text>
              </Box>
            ),
          }}
          center={{
            centerComp: (
              <MomoIcon
                width={getFontSizeByWindowWidth(32)}
                height={getFontSizeByWindowWidth(32)}
              />
            ),
          }}
          title="Headings"
        />
      </Header>
    </Box>
  ),
};

export const HeaderWithIcon4: StoryObj<typeof HeaderMeta> = {
  render: args => (
    <Box gap={'vxl'}>
      <Header style={{paddingVertical: getFontSizeByWindowWidth(13)}}>
        <TopHeaderContent
          ph="sm"
          left={{
            leftComp: (
              <Box alignItems={'center'} style={{gap: 2}}>
                <PersonroundIcon
                  width={getFontSizeByWindowWidth(18)}
                  height={getFontSizeByWindowWidth(18)}
                />
                <Text
                  lineHeight={getFontSizeByWindowWidth(10)}
                  // fontFamily={'MTNBrighterSans-Light'}
                  fontSize={getFontSizeByWindowWidth(8)}
                  color={'white'}>
                  Account
                </Text>
              </Box>
            ),
          }}
          center={{
            centerComp: (
              <MomoIcon
                width={getFontSizeByWindowWidth(32)}
                height={getFontSizeByWindowWidth(32)}
              />
            ),
          }}
          title="Headings"
        />
      </Header>
    </Box>
  ),
};

export default HeaderMeta;
