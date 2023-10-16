import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import icon from '@/constants/icon';
import {Box, Text} from '@atom';
import {moderateScale} from 'react-native-size-matters';
import BalanceHeader from './BalanceHeader';
import HorizontalCardSeparator from './HorizontalCardSeparator';
import BalanceFooter from './BalanceFooter';
import {VerticalSeparator} from './VerticalSeparator';
import HBalance from './HBalance';

export const CardContent1 = () => {
  const [showBalance, setshowBalance] = useState(false);
  const toggleBalance = () => {
    setshowBalance(v => !v);
  };
  return (
    <Box style={styles.cardContainer}>
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
  );
};

export const CardContent2 = () => {
  const {colors, spacing} = useTheme<Theme>();
  return (
    <Box style={styles.cardContainer}>
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
  );
};

// export default CardContent1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 20,
    // backgroundColor: '#fff',
  },
  cardContainer: {
    // backgroundColor: '#fff',
    // backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    // height: '100%',
    // flex: 1,
  },
});
