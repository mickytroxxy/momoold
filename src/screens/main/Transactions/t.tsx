import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView,View} from 'react-native';

import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';

import {getFontSizeByWindowWidth} from '@/style/theme';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import Dropdown, { selectRenderItemType } from '@/component/molecule/Dropdown/DropdownSearch';
import { Header, HorizontalCardSeparator, TopHeaderContent } from '@molecule';
import Tab from '@/component/molecule/Tab/Tab';
import TabScene from './TabScene';
import { alertContent } from '@/style-dictionary-dist/momoStyle';
import { transactionType } from './Type';

const transactionsHolder = [
  {fromUser:'Momo Account Pay',amount:608,time:(Date.now() - (2 * 86400000)),user:'Momo Account',type:'Refund', transactionType:'MONEY_IN'},
  {fromUser:'+27658016035',amount:808,time: (Date.now()), transactionType:'MONEY_OUT',user:'Gift Manyama',type:'Refund'},
  {fromUser:'+27658016088',amount:66,time:(Date.now()), transactionType:'MONEY_OUT',user:'Momo Pay',type:'Cash Send'},
  {fromUser:'Withdrawal',amount:808,time:(Date.now()), transactionType:'MONEY_IN',user:'Momo Account',type:'Cash In'},
  {fromUser:'+27658016099',amount:808,time:(Date.now() - 86400000), transactionType:'MONEY_OUT',user:'Niresh Com',type:'Transfer'},
  {fromUser:'+27658016080',amount:787,time:(Date.now() - (86400000 / 2)), transactionType:'MONEY_OUT',user:'Momo Account',type:'Refund'},
  {fromUser:'+27658016040',amount:4545,time:(Date.now() - 86400000 / 3), transactionType:'MONEY_IN',user:'Joseph NGA',type:'Payment'},
  {fromUser:'+27658016070',amount:8880,time:(Date.now() - (2 * 86400000)), transactionType:'MONEY_IN',user:'Lameck Ndhlovu',type:'Payment'},
]

const Transactions = ({navigation}: any) => {
  const {colors, spacing} = useTheme<Theme>();
  const {MainBackIcon, MainMoreIcon, MainSearchIcon, TransactionFilter} = icon;
  const [transactions,setTransactions] = useState<transactionType[]>([
    {fromUser:'Momo Account Pay',amount:608,time:(Date.now() - (2 * 86400000)),user:'Momo Account',type:'Refund', transactionType:'MONEY_IN'},
    {fromUser:'+27658016035',amount:808,time: (Date.now()), transactionType:'MONEY_OUT',user:'Gift Manyama',type:'Refund'},
    {fromUser:'+27658016088',amount:66,time:(Date.now()), transactionType:'MONEY_OUT',user:'Momo Pay',type:'Cash Send'},
    {fromUser:'Withdrawal',amount:808,time:(Date.now()), transactionType:'MONEY_IN',user:'Momo Account',type:'Cash In'},
    {fromUser:'+27658016099',amount:808,time:(Date.now() - 86400000), transactionType:'MONEY_OUT',user:'Niresh Com',type:'Transfer'},
    {fromUser:'+27658016080',amount:787,time:(Date.now() - (86400000 / 2)), transactionType:'MONEY_OUT',user:'Momo Account',type:'Refund'},
    {fromUser:'+27658016040',amount:4545,time:(Date.now() - 86400000 / 3), transactionType:'MONEY_IN',user:'Joseph NGA',type:'Payment'},
    {fromUser:'+27658016070',amount:8880,time:(Date.now() - (2 * 86400000)), transactionType:'MONEY_IN',user:'Lameck Ndhlovu',type:'Payment'},
  ])
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
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  const dropDownData = [
    {label:'LAST 1 DAYS',value:0.5},
    {label:'LAST 7 DAYS',value:'7'},
    {label:'LAST 15 DAYS',value:'15'},
    {label:'LAST 30 DAYS',value:'30'},
    {label:'LAST 45 DAYS',value:'45'},
    {label:'LAST 60 DAYS',value:'60'}
  ]
  useEffect(() => {
    const duration = selectedDuration * 86400000;
    const startTime = Date.now() - duration * 86400000;
    const filteredTransactions = transactionsHolder.filter((transaction) => transaction.time >= startTime);
    setTransactions(filteredTransactions);
  },[selectedDuration])
  const renderItem = ({item, onItemPress, selected}: selectRenderItemType) => {
    setSelectedDuration(parseFloat(selected.split(" ")[1]))
    return (
      <TouchableOpacity
        bg={item.label === selected ? 'extraLightGrey' : 'transparent'}
        height={getFontSizeByWindowWidth(34)}
        justifyContent={'center'}
        paddingHorizontal={'hs'}
        testID="tes"
        zIndex={200}
        onPress={() => onItemPress(item)}>
        <Text
          fontFamily="MTNBrighterSans-Regular"
          fontSize={getFontSizeByWindowWidth(16)}
          color={'black'}>
          {item['label']}
        </Text>
      </TouchableOpacity>
    );
  };
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
          title="Main Account"
          titleStyle={{color: colors.sunshineYellow}}
          right={{
            rightComp: (
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight:10}}>
                  <TouchableOpacity onPress={() => navigation.navigate("TransactionsSearch")}>
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
        <Box style={{flexDirection: 'row',padding:24}}>
          <View style={{flex:3.5}}>
            <Dropdown
              renderItem={renderItem}
              data={dropDownData}
              paddingContainer="hm"
              onSelect={e => setSelectedDuration(parseInt(e.value))}
              value={dropDownData[0]}
              placeHolder={'LAST 7 DAYS'}
              label="Date Range"
              
            />
          </View>
          <View style={{justifyContent:'center',flex:0.5,alignItems:'flex-end'}}>
            <View style={{borderRadius:100,borderWidth:1,padding:5,borderColor:colors.momoBlue}}><TransactionFilter stroke={colors.momoBlue} height={14} width={14} /></View>
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