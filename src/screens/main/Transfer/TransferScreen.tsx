import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  useWindowDimensions,
} from 'react-native';

type Props = {};

import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
import { Card, CurvedHeaderBg, HorizontalCardSeparator, TopHeaderContent } from '@molecule';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { UserAccountType, setTransactions } from '@/features/transactions/transactionSlice';
import { formatDate, formatTime } from '../Transactions/TransactionList';

const transferHistory = [
  {toAccount:'+27658016035',amount:808,time: (Date.now()),type:'Reconciliation'},
  {toAccount:'+27658016088',amount:66,time:(Date.now()),type:'Float'},
  {toAccount:'Withdrawal',amount:808,time:(Date.now()),type:'Refund'},
]
const TransferScreen = ({navigation}:any) => {
  const dispatch = useDispatch();
  const transactionData = useSelector((state: RootState) => state.transactionReducer);
  const userAccounts:UserAccountType[] = transactionData.userAccounts;
  const {colors} = useTheme<Theme>();
  const {TIcon1,TIcon2,TIcon3,BusinessNotificationIcon,TransferBannerIcon, TransferIconRefresh, MainBackIcon, BankingIcon, MomoIcon, MomoGrowIcon, GetMoneyIcon, NotifoutlineIcon, MoneyInIcon, NoTransactionIcon} = icon;
  const ACTION_BTNS = [
    {name:'Account Transfer',icon:TransferIconRefresh},{name:'Banking Services',icon:BankingIcon}
  ]

  const groupedTransactions = transferHistory?.reduce((acc:any, transaction) => {
    const formattedDay = formatDate(transaction.time);
    acc[formattedDay] = acc[formattedDay] || [];
    acc[formattedDay].push(transaction);
    return acc;
  }, {});
  
  const arrayOfGroups = Object.entries(groupedTransactions).map(([day, items]) => ({
    day,
    items,
  }));
  return (
    <SafeAreaContainer bg={'primaryColor'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CurvedHeaderBg height={331}>
            <TopHeaderContent
              containerStyle={{paddingVertical: moderateScale(3),alignItems: 'flex-start'}}
              right={{rightComp: <BusinessNotificationIcon width={24} height={24} />}}
              left={{leftComp: <TouchableOpacity onPress={() => navigation.goBack()}><MainBackIcon /></TouchableOpacity>}}
              title='Transfers'
              titleStyle={{color: '#FFCB05'}}
            />
            
            <Box style={{margin:20,paddingTop:20}}>
              <Card style={{height:141,flexDirection:'row'}}>
                <Box style={{width:140}}>
                  <Box style={{left:-20,top:-40}}><TransferBannerIcon /></Box>
                  {/* <Box style={{position:'absolute',left:80,top:-15}}><TIcon3 /></Box>
                  <Box style={{position:'absolute',bottom:0,left:30}}><TIcon1 /></Box> */}
                </Box>
                <Box style={{flex:1,padding:10,paddingTop:20}}>
                  <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={18}>Transfer Money</Text>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Transfer money between your MoMo accounts or transfer money from MoMo to your bank account</Text>
                </Box>
              </Card>
              <Box style={{flexDirection:'row',alignItems:'center',marginTop:10,justifyContent:'center'}}>
                <View style={{width:10,height:10,borderRadius:100,backgroundColor:'white',margin:3}}></View>
                <View style={{width:10,height:10,borderRadius:100,backgroundColor:colors.sunshineYellow,margin:3}}></View>
                <View style={{width:10,height:10,borderRadius:100,backgroundColor:'white',margin:3}}></View>
              </Box>
              <Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} color={'white'} lineHeight={24} style={{marginTop:10}} fontSize={18}>What do you need to do?</Text>
            </Box>
          </CurvedHeaderBg>

          <Box style={{marginTop:-50,paddingBottom:100}}>
            <Box style={{width:240,alignSelf:'center'}}>
              <Box style={{marginTop:5,justifyContent:'space-between',flexDirection:'row',paddingLeft:20,paddingRight:20}}>
                {ACTION_BTNS.map((item, i) => 
                  <TouchableNativeFeedback onPress={() => navigation.navigate("BankingServices",{headerTitle:'Banking Services'})} key={i}>
                    <Card  variant={'shadow'} style={{width:96,height:96,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor: 'white'}}>
                      <item.icon fill={colors.momoBlue}/>
                      <Box style={{paddingLeft:10,paddingRight:10}}><Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} fontSize={10} color={'momoBlue'}>{item.name}</Text></Box>
                    </Card>
                  </TouchableNativeFeedback>
                )}
              </Box>
            </Box>
            <Box>
              <Box style={{flexDirection:'row',padding:24}}>
                <Box style={{flex:1}}><Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} lineHeight={24} fontSize={16}>Recent Transfers</Text></Box>
                <TouchableHighlight style={{justifyContent:'center'}}><Text variant={'extraSmall'} textDecorationLine={'underline'} textAlign={'center'} color={'momoBlue'}>View All</Text></TouchableHighlight>
              </Box>
              <Box>
                {arrayOfGroups?.length > 0 && arrayOfGroups.map((transferItem:any,i) => {
                  return(
                    <Box key={i}>
                      <View style={{paddingLeft:24,paddingRight:24,paddingBottom:12}}><Text variant={'medium12'} fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} >{transferItem.day}</Text></View>
                      {transferItem.items.map((item:any,i:number) => {
                        return(
                          <Box key={i}>
                            <Box style={{flexDirection:'row',padding:10,paddingLeft:24,paddingRight:24,backgroundColor: (i % 2 === 0 ? colors.white : '#F9F9F9')}}>
                              <View style={{justifyContent:'center',flex:1}}>
                                  <Text variant={'medium12'} color={'black'} fontFamily={'MTNBrighterSans-Medium'} style={{letterSpacing:-0.5}}>{item.toAccount}</Text>
                                  <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>Transfer • {formatTime(item.time)}</Text>
                                  <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{item.type}</Text>
                              </View>
                              <View style={{justifyContent:'center'}}>
                                <Text lineHeight={28} color={'black'} fontFamily={'MTNBrighterSans-Bold'} fontSize={12}>GHc {item.amount.toFixed(2)}</Text>
                              </View>
                            </Box>
                          </Box>
                        )
                      })}
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Box>
        </ScrollView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 20,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default TransferScreen;








