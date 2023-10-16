import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {TouchableOpacity,View} from 'react-native';
import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import { gpsh } from '@/utils/parseTokenStyle';
import { transactionType } from '@/screens/main/Transactions/Type';
import Card from './Card';
import HorizontalCardSeparator from './HorizontalCardSeparator';
import { formatTime } from '@/screens/main/Transactions/TransactionList';
import { useDispatch } from 'react-redux';
import { setTransactions } from '@/features/transactions/transactionSlice';

type PropsType = {
    accountType:string;
    currency:string;
    balance:number;
    transactions:transactionType[]
    navigation?:any;
    accountId:any;
}
const {CircleArrowIcon,MoneyInIcon,MoneyOutIcon,NoTransactionIcon} = icon;
export const BusinessAccountsHistory = (props:PropsType) => {
    const {colors} = useTheme<Theme>();
    const {accountType,currency,balance,transactions,accountId,navigation} = props;
    const dispatch = useDispatch();
    return (
        <View style={{flex:1}}>
            <Card style={{borderRadius:20,marginBottom:12}} variant={'shadow'}>
                <Box>
                    <Box style={{flexDirection:'row',marginTop:12}}>
                    <Box>
                        <Box style={{backgroundColor:'#E8E8E8',borderTopRightRadius:14,borderBottomRightRadius:14,padding:8,width:200,borderTopLeftRadius: 5,paddingLeft:20}}><Text color={'momoBlue'} variant={'medium12'}>{accountType}</Text></Box>
                        <Box style={{flexDirection:'row',paddingLeft:20,width:200}}>
                        <Text color={'momoBlue'} fontSize={14} lineHeight={14.2} style={{marginTop:10}}>{currency} </Text>
                        <Text color={'momoBlue'} fontFamily={'MTNBrighterSans-Bold'} lineHeight={31.2} style={{fontSize:24}}> {balance.toFixed(2)}</Text>
                        </Box>
                    </Box>
                    <Box style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={() => {
                            dispatch(setTransactions(transactions))
                            navigation.navigate("Transactions",{accountType,accountId})
                        }}><CircleArrowIcon stroke={colors.momoBlue} style={{marginRight:24}} width={24} height={24}/></TouchableOpacity>
                    </Box>
                    </Box>
                    <Box style={{padding:20,paddingTop:5}}>
                    <HorizontalCardSeparator w={1}/>
                    {transactions?.length > 0 ? transactions?.slice(0,2).map((transactionItem,i) => {
                        return(
                        <Box key={i} style={{flexDirection:'row',marginTop:10}}>
                            <Box style={{justifyContent:'center'}}>{transactionItem.transactionType === 'MONEY_IN' ? <MoneyInIcon width={14} height={14}/> : <MoneyOutIcon width={14} height={14}/>}</Box>
                            <Box style={{justifyContent:'center',flex:1,marginLeft:10}}>
                                <Text variant={'medium12'} color={'black'} fontFamily={'MTNBrighterSans-Medium'} style={{letterSpacing:-0.5}}>{transactionItem.fromUser}</Text>
                                <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{formatTime(transactionItem.time)} {transactionItem.transactionType === 'MONEY_IN' ? '• Money In' : ''}</Text>
                            </Box>
                            <Box style={{justifyContent:'center'}}>
                                <Text lineHeight={28} color={ transactionItem.transactionType === 'MONEY_IN' ? 'green80' : 'red80'} fontFamily={'MTNBrighterSans-Bold'} fontSize={12}>{transactionItem.transactionType === 'MONEY_IN' ? '+' : '-'}GHc {transactionItem.amount.toFixed(2)}</Text>
                            </Box>
                        </Box>
                        )
                    }) : (
                        <View style={{flexDirection:'row',marginTop:5}}>
                            <NoTransactionIcon fill={colors.grey} style={{marginRight:24}} width={14} height={14}/>
                            <View style={{justifyContent:'center'}}><Text variant={'medium12'} style={{color:'#A5A5A5'}} fontSize={10} fontFamily={'MTNBrighterSans-Regular'}>No payments received yet</Text></View>
                        </View>
                    )}
                    
                    </Box>
                </Box>
            </Card>
        </View>
    );
};