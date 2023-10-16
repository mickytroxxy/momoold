import TransactionCard from '@/component/molecule/Card/TransactionCard';
import {Box, Text} from '@atom';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const RecentlyPaid = () => {
  const navigattion = useNavigation();
  return (
    <Box
      width={'100%'}
      minHeight={500}
      flexGrow={1}
      flex={1}
      pt={'vm'}
      px={'hm'}>
      <TouchableOpacity
        onPress={() => {
          navigattion.navigate('transactions');
        }}>
        <Text
          color={'momoBlue'}
          mb={'vsm'}
          variant={'regular12'}
          textAlign={'right'}>
          See All
        </Text>
      </TouchableOpacity>
      <Box gap={'vxs'}>
        {[1, 2, 3].map(v => (
          <TransactionCard
            key={v.toString()}
            title="Oriental food & gift..."
            amount="₦ 500"
            date="15 Feb 2022 | 13:37"
            type="bank transfer"
            credit
          />
        ))}
      </Box>
      {/* <Text>RecentlyPsssaid</Text> */}
    </Box>
  );
};

export default RecentlyPaid;
