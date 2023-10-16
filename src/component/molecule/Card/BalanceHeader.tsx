import TouchableOpacity from '@/component/atom/TouchableOpacity';
import icon from '@/constants/icon';
import {cardsWalletCardSingleBalanceTopMargin} from '@/style-dictionary-dist/momoStyle';
import {
  getFontSizeByWindowHeight as gsh,
  getFontSizeByWindowWidth as gsw,
} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Box, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {StyleSheet} from 'react-native';

type BalanceHeaderType = {
  showBalance: boolean;
  //   toggleBalance: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBalance: () => void;
  phoneNumber: string;
  balnce: string;
};
const BalanceHeader = ({
  showBalance,
  toggleBalance,
  phoneNumber,
  balnce,
}: BalanceHeaderType) => {
  const {colors} = useTheme<Theme>();
  const {EyeIcon, EyeslashIcon} = icon;
  return (
    <Box
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: gsw(10),
        // paddingTop: getFontSizeByWindowHeight(parseInt(cardsWalletCardSingleBalanceTopMargin)),
        // paddingBottom:
      }}>
      <Text
        style={{
          fontSize: gsw(12),
          fontFamily: 'MTNBrighterSans-Medium',
          color: colors.momoBlue,
          lineHeight: gsw(15.6),
        }}>
        {phoneNumber}
      </Text>
      <Box
        flexDirection={'row'}
        px={'hsm'}
        // style={{paddingHorizontal: 13}}
        justifyContent={'space-between'}
        gap={'hsm'}>
        <Box
          flex={1}
          // width={'94%'}
          // bg={'red100'}
        >
          <Text
            style={{
              fontSize: gsw(20),
              lineHeight: gsw(25),
              fontFamily: 'MTNBrighterSans-Medium',
              color: colors.momoBlue,
              textAlign: 'center',
              // flex: 1
            }}>
            {showBalance ? 'FCFA ************' : balnce}
          </Text>
        </Box>
        <TouchableOpacity alignItems={'flex-end'} onPress={toggleBalance}>
          {showBalance ? (
            <EyeIcon
              stroke={colors.momoBlue}
              width={gsw(24)}
              height={gsh(24)}
            />
          ) : (
            <EyeslashIcon
              stroke={colors.momoBlue}
              height={gsh(24)}
              width={gsw(24)}
            />
          )}
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default BalanceHeader;
