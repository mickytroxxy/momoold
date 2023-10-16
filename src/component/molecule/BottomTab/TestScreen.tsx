import icon from '@/constants/icon';
import {Theme} from '@/typings/globalTheme';
import BalanceFooter from '@molecule/Card/BalanceFooter';
import BalanceHeader from '@molecule/Card/BalanceHeader';
import Card from '@molecule/Card/Card';
import HorizontalCardSeparator from '@molecule/Card/HorizontalCardSeparator';
import LinearTab from '@molecule/Tab/LinearTab';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Box, ScrollView, Text} from '../../atom';
import CurvedHeaderBg from '@molecule/Header/CurvedHeaderBg';
import TopHeaderContent from '@molecule/Header/TopHeaderContent';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';

const TestScreen = () => {
  const {colors} = useTheme<Theme>();
  const {InfoCardIcon, PersonroundIcon, MomoIcon, BackIcon, NotifoutlineIcon} =
    icon;
  const [showBalance1, setshowBalance1] = useState(false);
  const toggleBalance1 = () => {
    setshowBalance1(v => !v);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1}>
      <Box>
        <CurvedHeaderBg>
          <TopHeaderContent
            containerStyle={{
              paddingVertical: getFontSizeByWindowHeight(13),
              alignItems: 'flex-start',
            }}
            right={{
              rightComp: (
                <NotifoutlineIcon
                  width={getFontSizeByWindowWidth(24)}
                  height={getFontSizeByWindowHeight(24)}
                />
              ),
            }}
            left={{
              leftComp: (
                <PersonroundIcon
                  width={getFontSizeByWindowWidth(24)}
                  height={getFontSizeByWindowHeight(24)}
                />
              ),
            }}
            center={{
              centerComp: (
                <MomoIcon
                  width={getFontSizeByWindowWidth(40)}
                  height={getFontSizeByWindowHeight(40)}
                />
              ),
            }}
            // title="Headings"
            titleStyle={{
              color: '#FFCB05',
            }}
          />
        </CurvedHeaderBg>
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
              <HorizontalCardSeparator w={0.5} />
              {/* BOTTOM */}
              <BalanceFooter
                label="Statements"
                icon={
                  <InfoCardIcon
                    stroke={colors.momoBlue}
                    // fill={colors.momoBlue}
                    width={getFontSizeByWindowWidth(18)}
                    height={getFontSizeByWindowHeight(18)}
                  />
                }
              />
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
};

export default TestScreen;
