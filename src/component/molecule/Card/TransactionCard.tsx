import React from 'react';
import {Box, Text} from '@atom';
import Card from './Card';
import {
  getFontSizeByWindowHeight as gsh,
  getFontSizeByWindowWidth as gsw,
} from '@/style/theme';

type TransactionCardType = {
  title: string;
  date: string;
  type: string;
  amount: string;
  credit?: boolean;
  topBoxed?: boolean;
};

const TransactionCard = ({
  title,
  date,
  type,
  amount,
  credit,
  topBoxed,
}: TransactionCardType) => {
  return (
    <Card
      variant={'shadow'}
      style={[
        {
          paddingVertical: gsh(10),
          paddingHorizontal: gsw(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        topBoxed && {borderTopLeftRadius: 0, borderTopRightRadius: 0},
      ]}>
      <Box>
        <Text
          color={'black'}
          style={{
            fontFamily: 'MTNBrighterSans-Regular',
            fontSize: gsw(10),
            lineHeight: gsh(12),
          }}>
          {title}
        </Text>
        <Text
          color={'grey'}
          style={{
            fontFamily: 'MTNBrighterSans-Regular',
            fontSize: gsw(9),
            lineHeight: gsh(12),
          }}>
          {date}
        </Text>
        <Text
          color={'lightGrey'}
          style={{
            fontFamily: 'MTNBrighterSans-Regular',
            fontSize: gsw(9),
            lineHeight: gsh(12),
          }}>
          Transaction type: {type}
        </Text>
      </Box>
      <Text
        color={credit ? 'green100' : 'red100'}
        style={{
          fontFamily: 'MTNBrighterSans-Medium',
          fontSize: gsw(10),
          lineHeight: gsh(12),
        }}>{`${credit ? '+' : '-'} ${amount}`}</Text>
    </Card>
  );
};

export default TransactionCard;
