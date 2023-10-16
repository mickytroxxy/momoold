import React from 'react';
import { Box, Text } from '@atom';
import CurvedHeader from '@molecule/Header/CurvedHeader';
import { HeaderWithIcon3 } from '@molecule/Header/Header.stories';
import Header from '@molecule/Header/Header';
import { moderateScale } from 'react-native-size-matters';
import TopHeaderContent from '@molecule/Header/TopHeaderContent';
import icon from '@/constants/icon';
import { TouchableOpacity } from 'react-native';

const EmptyScreen = ({ navigation }: any) => {
  const { NotifoutlineIcon, MomoIcon, PersonroundIcon } = icon
  return (
    <Box gap={'vxl'}>
      <Header style={{ paddingVertical: moderateScale(13) }}>
        <TopHeaderContent
          ph="sm"
          right={{
            rightComp: (
              <Box alignItems={'center'}>
                <NotifoutlineIcon />
                <Text fontSize={8} color={'white'} style={{ gap: 2 }}>
                  Notification
                </Text>
              </Box>
            ),
          }}
          left={{
            leftComp: (
              <Box alignItems={'center'} style={{ gap: 2 }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <PersonroundIcon />
                </TouchableOpacity>
                <Text
                  lineHeight={10}
                  // fontFamily={'MTNBrighterSans-Light'}
                  fontSize={moderateScale(8)}
                  color={'white'}>
                  Account
                </Text>
              </Box>
            ),
          }}
          center={{ centerComp: <MomoIcon width={32} height={32} /> }}
          title="Headings"
        />
      </Header>
    </Box>
  );
};

export default EmptyScreen;
