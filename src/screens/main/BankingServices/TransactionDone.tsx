import React from 'react';
import {ScrollView, Image} from 'react-native';
import {Box, Button, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
//@ts-ignore
import { TopHeaderContent } from '@molecule';
import { CurvedHeaderBg } from '@molecule/index';

const {MainBackIcon,MomoIcon  } = icon;
const TransactionDone = ({navigation,route}: any) => {
  const {fromScreen,obj} = route.params;

  return (
    <SafeAreaContainer bg={'primaryColor'}>
        <ScrollView>
        <CurvedHeaderBg height={300}>
            <TopHeaderContent
                containerStyle={{paddingVertical: moderateScale(3),alignItems: 'flex-start'}}
                left={{leftComp: <TouchableOpacity onPress={() => navigation.goBack()}><MainBackIcon /></TouchableOpacity>}}
                center={{centerComp: <MomoIcon width={40} height={40} />}}
            />
        </CurvedHeaderBg>
        <Box style={{marginTop:-220}}>
            <Box style={{alignItems:'center'}}><Image source={require('../../../assets/images/transactionsdone.png')} style={{height:347,width:272}} /></Box>
            <Box style={{paddingLeft:24,paddingRight:24}}>
                {fromScreen === "TRANSACTION" &&
                    <Box>
                        <Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} color={'momoBlue'} fontSize={24}>Transaction Successful</Text>
                        <Text fontFamily={'MTNBrighterSans-Medium'} textAlign={'center'}  color={'grey'} fontSize={14}>You have successfully transfered <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{obj.amount}</Text> to <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{obj.bankName}</Text> account <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{obj.accountNumber}</Text></Text>
                    </Box>
                }
                {fromScreen === "BUYAIRTIME" &&
                    <Box>
                        <Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} color={'momoBlue'} fontSize={24}>Purchase Successful</Text>
                        <Text fontFamily={'MTNBrighterSans-Medium'} textAlign={'center'}  color={'grey'} fontSize={14}>You have successfully purchased <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{obj.amount}</Text> Airtime for <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{obj.mobileNumber}</Text></Text>
                    </Box>
                }
            </Box>
            <Box style={{padding:24}}>
                <Button
                    bStyle={{marginRight:10}}
                    onPress={() => {navigation.navigate("HomeScreen")}}
                    label="Done"
                    variant="primary"
                    size="fullWidth"
                />
                <Button
                    bStyle={{marginRight:10,marginTop:10}}
                    onPress={() => {navigation.navigate(fromScreen === "TRANSACTION" ? "BankingServices" : "BuyAirtime")}}
                    label={fromScreen === "TRANSACTION" ? "Transfer Again" : "Buy Again"}
                    variant="secondary"
                    size="fullWidth"
                />
            </Box>
        </Box>
        </ScrollView>
    </SafeAreaContainer>
  );
};

export default TransactionDone;