import React from 'react';
import {Box, Text} from '@atom';
import {getFontSizeByWindowWidth as gsw} from '@/style/theme';
import TransactionCard from '@/component/molecule/Card/TransactionCard';

const Beneficiaries = () => {
  return (
    <Box
      width={'100%'}
      minHeight={500}
      flexGrow={1}
      flex={1}
      pt={'vm'}
      alignItems={'center'}>
      <Box
        style={{
          paddingHorizontal: gsw(35),
        }}>
        <Text variant={'regular12'} textAlign={'center'}>
          It looks like you haven't added any beneficiaries yet. Please add at
          least one beneficiary to continue.
        </Text>
      </Box>

      {/* <Text>RecentlyPsssaid</Text> */}
    </Box>
  );
};

export default Beneficiaries;
