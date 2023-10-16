import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {linearTabData} from '@/component/molecule/Tab/Tab.stories';
import {ThemeContext} from '@/context/themeContext';
import {getFontSizeByWindowHeight as gsw} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Box, Icon, ScrollView, Text} from '@atom';
import {
  BalanceFooter,
  BalanceHeader,
  Card,
  CurvedHeaderBg,
  HorizontalCardSeparator,
  LinearTab,
  TopHeaderContent,
} from '@molecule';
import {useTheme} from '@shopify/restyle';
import {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import HomeScreenTabs from './HomeScreenTab/tabs';

function Homescreen() {
  const [theme, setTheme, setPrimaryColor] = useContext(ThemeContext);
  const {colors} = useTheme<Theme>();

  const [showBalance1, setshowBalance1] = useState(false);
  const toggleBalance1 = () => {
    setshowBalance1(v => !v);
  };
  return (
    <SafeAreaContainer bg={'primaryColor'}>
      <ScrollView showsVerticalScrollIndicator={false} flex={1}>
          <CurvedHeaderBg>
            <TopHeaderContent
              containerStyle={{
                paddingVertical: gsw(13),
                alignItems: 'flex-start',
              }}
              right={{
                rightComp: <Icon name="NotifoutlineIcon" size={24} />,
              }}
              left={{
                leftComp: <Icon name="PersonroundIcon" size={24} />,
              }}
              center={{
                centerComp: <Icon name="MomoIcon" size={40} />,
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
                    <Icon color={colors.momoBlue} name="Statement" size={18} />
                  }
                />
              </Box>
            </Card>
          </Box>
          <Box mt={'vm'} width={'100%'}>
            <LinearTab tabData={HomeScreenTabs} pH={20} spaceEvenly />
          </Box>

          <Text pt={'vxl'}>1</Text>
      </ScrollView>
    </SafeAreaContainer>
  );
}

export default Homescreen;


