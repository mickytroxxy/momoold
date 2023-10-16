import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

type Props = {};

import {Box, Icon, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';

import {getFontSizeByWindowWidth} from '@/style/theme';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import Dropdown, { selectRenderItemType } from '@/component/molecule/Dropdown/DropdownSearch';
import { Header, HorizontalCardSeparator, TopHeaderContent } from '@molecule';
import Tab from '@/component/molecule/Tab/Tab';
import Accordion from '@/component/molecule/Accordion/Accordion';

const tabData = [
  {
    title: 'All',
    renderScene: () => <TabScene type='All' />,
  },
  {
    title: 'Money In',
    renderScene: () => <TabScene type='MONEY_IN' />,
  },
  {
    title: 'Money Out',
    renderScene: () => <TabScene type='MONEY_OUT' />,
  },
];
interface transactionType {
  fromUser: string;
  amount: number;
  time: number;
  user: string;
  type: string;
  transactionType: string;
}
const transactions = [
  {fromUser:'Momo Account Pay',amount:608,time:(Date.now() - (2 * 86400000)),user:'Momo Account',type:'Refund', transactionType:'MONEY_IN'},
  {fromUser:'+27658016035',amount:808,time: (Date.now()), transactionType:'MONEY_OUT',user:'Gift Manyama',type:'Refund'},
  {fromUser:'+27658016088',amount:66,time:(Date.now()), transactionType:'MONEY_OUT',user:'Momo Pay',type:'Cash Send'},
  {fromUser:'Withdrawal',amount:808,time:(Date.now()), transactionType:'MONEY_IN',user:'Momo Account',type:'Cash In'},
  {fromUser:'+27658016099',amount:808,time:(Date.now() - 86400000), transactionType:'MONEY_OUT',user:'Niresh Com',type:'Transfer'},
  {fromUser:'+27658016080',amount:787,time:(Date.now() - (86400000 / 2)), transactionType:'MONEY_OUT',user:'Momo Account',type:'Refund'},
  {fromUser:'+27658016040',amount:4545,time:(Date.now() - 86400000 / 3), transactionType:'MONEY_IN',user:'Joseph NGA',type:'Payment'},
  {fromUser:'+27658016070',amount:8880,time:(Date.now() - (2 * 86400000)), transactionType:'MONEY_IN',user:'Lameck Ndhlovu',type:'Payment'},
]
const formatTime = (timestamp:any) => {
  const date = new Date(timestamp);
  let hours:any = date.getHours();
  let minutes:any = date.getMinutes();
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

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

const Transactions = ({navigation}: any) => {
  const {colors, spacing} = useTheme<Theme>();
  const {MainBackIcon, MainMoreIcon, MainSearchIcon, TransactionFilter} = icon;

  const [select, setSelect] = useState<string>('');
  const renderItem = ({item, onItemPress, selected}: selectRenderItemType) => {
    console.log('selectedss', selected);
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
                <View>
                  <MainSearchIcon height={35} width={30} />
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
              data={[
                {label:'LAST 7 DAYS',value:'7'},
                {label:'LAST 15 DAYS',value:'15'},
                {label:'LAST 30 DAYS',value:'30'},
                {label:'LAST 45 DAYS',value:'45'},
                {label:'LAST 60 DAYS',value:'60'}
              ]}
              paddingContainer="hm"
              onSelect={e => setSelect(e.value)}
              value={'LAST 7 DAYS'}
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

type TabSceneProps = {
  type:string
}
const TabScene = (props:TabSceneProps) => {
  const {type} = props;
  const dataToRender = transactions?.filter(item => (item.transactionType === type || type === 'All'));
  const groupedTransactions = dataToRender?.reduce((acc:any, transaction) => {
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
              <View>
                <Accordion key={i} propData={[{
                  id: i,
                  title: item.day,
                  renderScene: () => <TransactionList data={item.items} />,
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
type TransactionListProps = {
  data:transactionType[]
}
const TransactionList = (props:TransactionListProps) => {
  const {MoneyInIcon, MoneyOutIcon} = icon;
  const {colors} = useTheme<Theme>();
  const {data} = props;
  return(
    <View>
      {data?.length > 0 && data.map((transactionItem,i) => {
        return(
          <View key={i} style={{flexDirection:'row',marginTop:10,padding:10,paddingLeft:24,paddingRight:24,backgroundColor: i % 2 === 0 ? colors.white : '#F9F9F9'}}>
            <View style={{justifyContent:'center'}}>{transactionItem.transactionType === 'MONEY_IN' ? <MoneyInIcon width={14} height={14}/> : <MoneyOutIcon width={14} height={14}/>}</View>
            <View style={{justifyContent:'center',flex:1,marginLeft:10}}>
              <Text variant={'medium12'} color={'black'} fontFamily={'MTNBrighterSans-Medium'} style={{letterSpacing:-0.5}}>{transactionItem.fromUser}</Text>
              <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{transactionItem.type} • {formatTime(transactionItem.time)}</Text>
              <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{transactionItem.user}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text lineHeight={28} color={ transactionItem.transactionType === 'MONEY_IN' ? 'green80' : 'red80'} fontFamily={'MTNBrighterSans-Bold'} fontSize={12}>{transactionItem.transactionType === 'MONEY_IN' ? '+' : '-'}GHc {transactionItem.amount.toFixed(2)}</Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}
export default Transactions;