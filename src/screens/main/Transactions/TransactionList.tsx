import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {
  View
} from 'react-native';


import { Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import { transactionType } from './Type';
import { HorizontalCardSeparator } from '@molecule/index';

export const formatTime = (timestamp:any) => {
  const date = new Date(timestamp);
  let hours:any = date.getHours();
  let minutes:any = date.getMinutes();
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
export const formatDate = (timestamp:any) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};
type TransactionListProps = {
  data:transactionType[],
  fromComponent: 'search' | 'transactions',
}
const TransactionList = (props:TransactionListProps) => {
  const {MoneyInIcon, MoneyOutIcon} = icon;
  const {colors} = useTheme<Theme>();
  const {data,fromComponent} = props;
  return(
    <View>
      {data?.length > 0 && data.map((transactionItem,i) => {
        return(
          <Box key={i}>
            <Box style={{flexDirection:'row',marginTop:10,padding:10,paddingLeft:24,paddingRight:24,backgroundColor: fromComponent === 'transactions' ? (i % 2 === 0 ? colors.white : '#F9F9F9') : colors.white}}>
              <View style={{justifyContent:'center',flex:1}}>
                  {fromComponent === 'search' && <View style={{paddingBottom:12}}><Text variant={'medium12'} fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} >{formatDate(transactionItem.time)}</Text></View>}
                  <Text variant={'medium12'} color={'black'} fontFamily={'MTNBrighterSans-Medium'} style={{letterSpacing:-0.5}}>{transactionItem.fromUser}</Text>
                  <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{transactionItem.type} • {formatTime(transactionItem.time)}</Text>
                  <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{transactionItem.user}</Text>
              </View>
              <View style={{justifyContent:'center'}}>
                <Text lineHeight={28} color={ transactionItem.transactionType === 'MONEY_IN' ? 'green80' : 'red80'} fontFamily={'MTNBrighterSans-Bold'} fontSize={12}>{transactionItem.transactionType === 'MONEY_IN' ? '+' : '-'}GHc {transactionItem.amount.toFixed(2)}</Text>
              </View>
            </Box>

            {fromComponent === "search" && <Box><HorizontalCardSeparator/></Box>}
          </Box>
        )
      })}
    </View>
  )
}
export default TransactionList;