import { getFontSizeByWindowWidth } from '@/style/theme';
import {Box, Text} from '@atom';
import {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

type historyDataType = {
  transaction: string;
  date: string;
  transactionId: string;
  amount: string;
};
type TransactionHistoryType = {
  historyData: historyDataType[];
};

const TransactionHistory = ({historyData}: TransactionHistoryType) => {
  function renderTransactionItem({
    item: {transaction, transactionId, amount, date},
    index,
  }: {
    item: (typeof historyData)[0];
    index: number;
  }) {
    return (
      <Box
        style={{
          paddingVertical: getFontSizeByWindowWidth(9),
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#afafaf',
          marginVertical: 0.5
        }}>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text
            style={{
              fontSize: getFontSizeByWindowWidth(8),
              lineHeight: getFontSizeByWindowWidth(12),
              fontFamily: 'MTNBrighterSans-Regular',
              color: '#AFAFAF',
            }}>
            {date}
          </Text>
          <Text
            style={{
              fontSize: getFontSizeByWindowWidth(10),
              lineHeight: getFontSizeByWindowWidth(12),
              fontFamily: 'MTNBrighterSans-Bold',
              color: '#AF0000',
            }}>
            {amount}
          </Text>
        </Box>
        <Text
          style={{
            fontSize: getFontSizeByWindowWidth(10),
            lineHeight: getFontSizeByWindowWidth(12),
            fontFamily: 'MTNBrighterSans-Regular',
            color: 'black',
          }}>
          {transaction}
        </Text>
        <Text
          style={{
            fontSize: getFontSizeByWindowWidth(8),
            lineHeight: getFontSizeByWindowWidth(12),
            fontFamily: 'MTNBrighterSans-Regular',
            color: '#AFAFAF',
          }}>{`Transaction ID: ${transactionId}`}</Text>
      </Box>
    );
  }
  const keyExtractor = useCallback(
    (item: historyDataType, index: number) => `${item.transactionId}-${index}`,
    [],
  );
  return (
    <Box>
      <FlatList
        data={historyData}
        renderItem={renderTransactionItem}
        keyExtractor={keyExtractor}
        // ItemSeparatorComponent={() => (
        //   <Box
        //     // height={0.5}
        //     style={{
        //       backgroundColor: '#afafaf',
        //       marginVertical: 0.5,
        //       height: StyleSheet.hairlineWidth,
        //     //   borderBottomWidth: StyleSheet.hairlineWidth,
        //     //   borderBottomColor: '#afafaf',
        //     }}
        //   />
        // )}
      />
    </Box>
  );
};

export default TransactionHistory;
