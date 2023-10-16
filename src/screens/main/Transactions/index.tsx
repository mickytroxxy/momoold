import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {ScrollView,View} from 'react-native';

import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
//@ts-ignore
import { Header, TopHeaderContent } from '@molecule';
import Tab from '@/component/molecule/Tab/Tab';
import TabScene from './TabScene';
import { transactionType } from './Type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TransactionFiltersType, setFilters } from '@/features/transactions/transactionSlice';
import {BusinessDropdownSingle } from '@molecule/Dropdown/BusinessDropdown';
const itemList = [
  {subtitle:'Main Account',maintitle:'Last 7 Days',value:7,id:1,selected:false},
  {subtitle:'MoMo Account Pay',maintitle:'Last 15 Days',value:15,id:2},
  {subtitle:'MoMo Account Pay',maintitle:'Last 30 Days',value:30,id:3},
  {subtitle:'MoMo Account Pay',maintitle:'Last 45 Days',value:45,id:4},
  {subtitle:'MoMo Account Pay',maintitle:'Last 60 Days',value:60,id:5}
]
const Transactions = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const dispatch = useDispatch();
  const {accountType,accountId} = route.params;
  const headerTitle = accountType.split(" ").slice(0,2).join(" ");
  const {MainBackIcon, MainMoreIcon, MainSearchIcon, TransactionFilter} = icon;
  const {transactions:transactionData, filters:filterData} = useSelector((state: RootState) => state.transactionReducer);
  const filters:TransactionFiltersType[] = filterData;
  const [transactions,setTransactions] = useState<transactionType[]>([])
  const [selectedDuration, setSelectedDuration] = useState<number>(0);
  console.log(selectedDuration)
  const datesData= filters.find((item) => item.type === 'dates')?.value;
  const amountsData= filters.find((item) => item.type === 'amounts')?.value;
  const transactionTypeData= filters.find((item) => item.type === 'transactionType')?.value;
  const tabData = [
    {
      title: 'All',
      renderScene: () => <TabScene transactions={transactions} type='All' />,
    },
    {
      title: 'Money In',
      renderScene: () => <TabScene transactions={transactions} type='MONEY_IN' />,
    },
    {
      title: 'Money Out',
      renderScene: () => <TabScene transactions={transactions} type='MONEY_OUT' />,
    },
  ];
  const filterByDateRangeTransactions = (data:any,transactions:transactionType[]) => {
    const fromDateTimestamp = data.data.find((item:any) => item.btn === "From")?.timeStamp;
    const toDateTimestamp = data.data.find((item:any) => item.btn === "To")?.timeStamp;
    const fromDate = fromDateTimestamp ? new Date(fromDateTimestamp).getTime() : 0;
    const toDate = toDateTimestamp ? new Date(toDateTimestamp).getTime() : Date.now();
    const filteredTransactions = transactions?.filter((transaction) => {
      const transactionTime = new Date(transaction.time).getTime();
      return transactionTime >= fromDate && transactionTime <= toDate;
    });
    return filteredTransactions;
  };
  const filterByAmountTransactions = (data:any,transactions:transactionType[]) => {
    const fromAmount = data.find((item:any) => item.btn === "From")?.value;
    const toAmount = data.find((item:any) => item.btn === "To")?.value;
    const filteredTransactions = transactions?.filter((transaction) => {
      const transactionAmount = transaction.amount;
      return transactionAmount >= fromAmount && transactionAmount <= toAmount;
    });
    return filteredTransactions;
  };

  const handleFilters = (transactions:transactionType[]) => {
    let transactionToFilter = transactions
    if(datesData){
      transactionToFilter = filterByDateRangeTransactions(datesData,transactionToFilter);
    }
    if(amountsData){
      transactionToFilter = filterByAmountTransactions(amountsData,transactionToFilter)
    }
    if(transactionTypeData){
      transactionToFilter = transactionToFilter.filter(item => item.type === transactionTypeData);
    }
    setTransactions(transactionToFilter)
  }
  const removeFilters = (filterType:'dates' | 'transactionType' | 'amounts') =>  dispatch(setFilters(filters.map(item => item.type === filterType ? {...item,value:false} : item)));
  useEffect(() => {
    if(selectedDuration !== 0){
      const duration = selectedDuration * 86400000;
      const startTime = Date.now() - duration * 86400000;
      const filteredTransactions = transactions.filter((transaction) => transaction.time >= startTime);
      setTransactions(filteredTransactions);
    }
  },[selectedDuration])

  useEffect(() => {
    if(filters.filter(item => item.value).length > 0){
      handleFilters(transactionData);
    }else{
      setTransactions(transactionData);
    }
  },[filters])
  return (
    <SafeAreaContainer bg={'primaryColor'}>
      <Header
        style={{
          paddingVertical: moderateScale(13),
          borderBottomWidth: 5,
          borderBottomColor: colors.sunshineYellow,
        }}>
        <TopHeaderContent
          left={{leftComp: <TouchableOpacity onPress={() => navigation.goBack()}><MainBackIcon /></TouchableOpacity>}}
          title={headerTitle}
          titleStyle={{color: colors.sunshineYellow}}
          right={{
            rightComp: (
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight:10}}>
                  <TouchableOpacity onPress={() => navigation.navigate("TransactionsSearch",{headerTitle})}>
                    <MainSearchIcon height={35} width={30} />
                  </TouchableOpacity>
                </View>
                <View>
                  <MainMoreIcon height={35} width={30} />
                </View>
              </View>
            ),
          }}
        />
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{padding:24}} color={'momoBlue'}>Transactions</Text>
        <Box style={{flexDirection: 'row',paddingLeft:24,paddingRight:24}}>
          <View style={{flex:1}}>
            {filters.filter(item => item.value).length === 0 ?
              <BusinessDropdownSingle placeholder='Date Range' required={true} itemList={itemList}  onSelected={(selectedOption) => {
                setSelectedDuration(selectedOption.value)
              }} /> :
              <View style={{flexDirection:'row',flex:1,flexWrap:'wrap',justifyContent:'space-between'}}>
                {datesData && 
                  <TouchableOpacity onPress={()=>removeFilters('dates')} style={{flexDirection:'row',width:190,padding:5,borderWidth:1,borderColor:colors.grey,borderRadius:30}}>
                    <View style={{flex:1,justifyContent:'center'}}><Text variant={'extraSmall'} fontSize={10}>{datesData.data.find((item:any) => item.btn === "From")?.value} to {datesData.data.find((item:any) => item.btn === "To")?.value}</Text></View>
                    <View style={{justifyContent:'center',marginRight:6}}><Text variant={'extraSmall'}>X</Text></View>
                  </TouchableOpacity>
                }
                {transactionTypeData && 
                  <TouchableOpacity onPress={()=>removeFilters('transactionType')} style={{flexDirection:'row',width:120,padding:5,borderWidth:1,borderColor:colors.grey,borderRadius:30}}>
                    <View style={{flex:1,justifyContent:'center'}}><Text variant={'extraSmall'} fontSize={10}>{transactionTypeData}</Text></View>
                    <View style={{justifyContent:'center',marginRight:6}}><Text variant={'extraSmall'}>X</Text></View>
                  </TouchableOpacity>
                }
                {amountsData && 
                  <TouchableOpacity onPress={()=>removeFilters('amounts')} style={{flexDirection:'row',marginTop:5,width:160,padding:5,borderWidth:1,borderColor:colors.grey,borderRadius:30}}>
                    <View style={{flex:1,justifyContent:'center'}}><Text variant={'extraSmall'} fontSize={10}>{amountsData.find((item:any) => item.btn === "From")?.value} to {amountsData.find((item:any) => item.btn === "To")?.value}</Text></View>
                    <View style={{justifyContent:'center',marginRight:6}}><Text variant={'extraSmall'}>X</Text></View>
                  </TouchableOpacity>
                }
              </View>
            }
            
            
          </View>
          
          <View style={{justifyContent:'center',flex:0.15,alignItems:'flex-end'}}>
            <View style={{borderRadius:100,borderWidth:0.6,padding:5,borderColor:colors.momoBlue}}>
              <TouchableOpacity onPress={() => navigation.navigate("TransactionsFilter",{headerTitle})}><TransactionFilter stroke={colors.momoBlue} height={14} width={14} /></TouchableOpacity>
            </View>
          </View>
        </Box>
        <Box zIndex={-1}>
          <Tab mH={24} tabData={tabData} />
        </Box>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Transactions;