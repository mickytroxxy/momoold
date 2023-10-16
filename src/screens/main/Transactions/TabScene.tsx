import React, {useState} from 'react';
import {View} from 'react-native';

import {Text} from '@/component/atom';
import icon from '@/constants/icon';
import {HorizontalCardSeparator } from '@molecule';
import Accordion from '@/component/molecule/Accordion/Accordion';
import TransactionList from './TransactionList';
import { transactionType } from './Type';

const formatDate = (timestamp:any) => {
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


type TabSceneProps = {
  type:string,
  transactions?:transactionType[]
}
const TabScene = (props:TabSceneProps) => {
  const {type,transactions} = props;
  const dataToRender = transactions?.filter(item => (item.transactionType === type || type === 'All'));
  const groupedTransactions = dataToRender?.sort((a, b) => b.time - a.time)?.reduce((acc:any, transaction) => {
    const formattedDay = formatDate(transaction.time);
    acc[formattedDay] = acc[formattedDay] || [];
    acc[formattedDay].push(transaction);
    return acc;
  }, {});
  
  const arrayOfGroups = Object.entries(groupedTransactions).map(([day, items]) => ({
    day,
    items,
  }));
  const {MoneyInIcon, MoneyOutIcon} = icon;
  return(
    <View style={{padding:0}}>
      <View style={{padding:24}}>
        {(type === "All" || type === "MONEY_IN") &&
          <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}><MoneyInIcon width={20} height={20}/></View>
            <View style={{flex:1,marginLeft:24}}>
              <Text color={'momoBlue'} fontFamily={'MTNBrighterSans-Bold'} fontSize={14}>Total Received</Text>
              <Text color={'black'} fontFamily={'MTNBrighterSans-Bold'} fontSize={18}>GHc 74849.00</Text>
            </View>
          </View>
        }
        {(type === "All" || type === "MONEY_OUT") &&
          <View style={{flexDirection:'row',marginTop: type === 'All' ? 8 : 0}}>
            <View style={{justifyContent:'center'}}><MoneyOutIcon width={20} height={20}/></View>
            <View style={{flex:1,marginLeft:24}}>
              <Text color={'momoBlue'} fontFamily={'MTNBrighterSans-Bold'} fontSize={14}>Total Spent</Text>
              <Text color={'black'} fontFamily={'MTNBrighterSans-Bold'} fontSize={18}>GHc 74849.00</Text>
            </View>
          </View>
        }
      </View>
      
      <View style={{paddingLeft:24,paddingRight:24}}><HorizontalCardSeparator/></View>
      <View style={{flexDirection:'row',marginTop:12}}>
        <HorizontalCardSeparator/>
        <View style={{width:'100%'}}>
          {arrayOfGroups?.length > 0 && arrayOfGroups.map((item:any,i) => {
            return(
              <View key={i}>
                <Accordion propData={[{
                  id: i,
                  title: item.day,
                  renderScene: () => <TransactionList fromComponent='transactions' data={item.items} />,
                  content:''
                }]} />
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
export default TabScene;