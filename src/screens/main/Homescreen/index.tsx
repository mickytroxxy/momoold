import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  View
} from 'react-native';
import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import { Card, CurvedHeaderBg, TopHeaderContent } from '@molecule';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { UserAccountType, setTransactions } from '@/features/transactions/transactionSlice';
import { formatTime } from '../Transactions/TransactionList';
import { gpsh } from '@/utils/parseTokenStyle';
import { BusinessAccountsHistory } from '@molecule/Card/BusinessAccountsHistory';

const Business = ({navigation}:any) => {
  const transactionData = useSelector((state: RootState) => state.transactionReducer);
  const userAccounts:UserAccountType[] = transactionData.userAccounts;
  const {BusinessNotificationIcon, MakeMoneyIcon, BusinessRechargeIcon, MomoIcon, MomoGrowIcon, GetMoneyIcon, NotifoutlineIcon, MoneyInIcon, NoTransactionIcon} = icon;
  const ACTION_BTNS = [
    {name:'MoMo Grow',icon:MomoGrowIcon,screen:''},{name:'Get Money',icon:GetMoneyIcon,screen:'MakeMoney'},{name:'Make Money',icon:MakeMoneyIcon,screen:'MakeMoney'}
  ]
  return (
    <SafeAreaContainer bg={'primaryColor'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CurvedHeaderBg height={220}>
            <TopHeaderContent
              containerStyle={{paddingVertical: moderateScale(3),alignItems: 'flex-start'}}
              right={{rightComp: <BusinessNotificationIcon width={24} height={24} />}}
              center={{centerComp: <MomoIcon width={40} height={40} />}}
              titleStyle={{color: '#FFCB05'}}
            />
            
            <Box px={'vs'} style={{marginTop:gpsh('23')}}>
              <Text fontFamily={'MTNBrighterSans-Bold'} color={'sunshineYellow'} fontSize={16} textAlign={'center'} lineHeight={16.25}>Total Balance</Text>
              <Box style={{flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'center',marginTop:5,marginBottom:10}}>
                <Text color={'white'} variant={'medium12'} fontSize={20} lineHeight={41.8} textAlign={'center'} style={{marginTop:-10}}>GHc </Text>
                <Text color={'white'} fontFamily={'MTNBrighterSans-Bold'} lineHeight={41.8} textAlign={'center'} style={{fontSize:42}}> 13760.40</Text>
              </Box>
            </Box>
          </CurvedHeaderBg>

          <Box style={{marginTop:-70,paddingBottom:100}}>
            <Box style={{paddingLeft:24,paddingRight:24}}>
              {userAccounts.map((item) => <View key={item.accountId}><BusinessAccountsHistory navigation={navigation} accountId={item.accountId} currency='GHc' accountType={item.type} balance={item.balance} transactions={item.transactions}  /></View>)}
            </Box>
            <Box style={{marginTop:5,justifyContent:'space-around',flexDirection:'row',paddingLeft:20,paddingRight:20}}>
              {ACTION_BTNS.map((item, i) => 
                <TouchableNativeFeedback onPress={() => navigation.navigate(item.screen)} key={i}>
                  <Card  variant={'shadow'} style={{width:96,height:96,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor: Platform.select({ios: '#004F71',android: '#003654',default: '#004F71'})}}>
                    <item.icon/>
                    <Text variant={'extraSmall'} fontSize={10} color={'white'}>{item.name}</Text>
                  </Card>
                </TouchableNativeFeedback>
              )}
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

export default Business;








