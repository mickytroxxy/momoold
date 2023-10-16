import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {ScrollView} from 'react-native';
import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import { Header, TopHeaderContent } from '@molecule';
import QuickAction from '@molecule/Card/QuickAction';

const {MainBackIcon,CalenderLeftNav,AdbIIcon,FbnIcon,BankOfAfricaIcon,AbsaIcon,StanbicIcon,UbaIcon} = icon;
const BankingServices = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const {headerTitle} = route.params;
  const bankList = [
    {bankName:'ADB',accountNumber:98878765678,balance:3338,icon:()=> <AdbIIcon/>},
    {bankName:'FBN',accountNumber:6475959505,balance:50,icon:()=> <FbnIcon/>},
    {bankName:'Bank Of Africa',accountNumber:43567887658,balance:9547,icon:()=> <BankOfAfricaIcon/>},
    {bankName:'ABSA',accountNumber:6475959505,balance:547,icon:()=> <AbsaIcon/>},
    {bankName:'Stanbic',accountNumber:6475959505,balance:0,icon:()=> <StanbicIcon/>},
    {bankName:'UBA',accountNumber:7767886678,balance:4578,icon:()=> <UbaIcon/>}
  ]
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
        />
      </Header>
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,padding:24,paddingTop:36}}>
        <Text fontFamily={'MTNBrighterSans-Medium'} color={'grey'} fontSize={14}>Please select a bank account to transfer money to or from.</Text>
        <Box style={{marginTop:20}}>
          {bankList?.map((bank,index) => 
            <Box key={index} style={{marginBottom:12}}>
              <QuickAction title={bank.bankName} onPress={() => {navigation.navigate("TransferAmount",{headerTitle,accountNumber:bank.accountNumber,balance:bank.balance,bankName:bank.bankName})}} icon={()=> <bank.icon/>} renderRightIcon={() => <CalenderLeftNav stroke={colors.momoBlue}/>} />
            </Box>
          )}
        </Box>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BankingServices;