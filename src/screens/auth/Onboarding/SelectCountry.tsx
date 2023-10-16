import {
  View,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {DarkStatusBar} from '@/component/molecule/StausBar';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import {Button} from '@/component/atom/Button/Button';
import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SelectCountry = () => {
  const {colors, spacing} = useTheme<Theme>();
  const {height, width} = useWindowDimensions();
  const {MomoIcon} = icon;
  const countries = ['Male', 'Hells', 'Cis', 'Hells', 'HermaPhrodite'];
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <DarkStatusBar />
      <SafeAreaView style={{flex: 1, position: 'relative'}}>
        <Box flex={1}>
          <Box
            flex={0.6}
            bg={'momoBlue'}
            px={'hm'}
            alignItems={'center'}
            justifyContent={'center'}>
            <MomoIcon height={moderateScale(62)} width={moderateScale(59)} />
            <Text variant={'headings'} mt={'vm'} color={'sunshineYellow'}>
              Y’ello
            </Text>
            <Text variant={'headings'} mt={'vxl'} color={'white'}>
              Welcome to MoMo
            </Text>
          </Box>
          <Box flex={0.4} bg={'white'} px={'hm'}>
            <Box style={{marginTop: '25%'}}>
     
            </Box>
          </Box>
        </Box>
        <Box position={'relative'}>
          <Box
            position={'absolute'}
            right={spacing.hm}
            left={spacing.hm}
            bottom={height / 20}>
            <Button onPress={() => {}} label="NEXT" variant="solid" />
          </Box>
        </Box>
      </SafeAreaView>
    </View>
  );
};

export default SelectCountry;
