import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {ScrollView,View} from 'react-native';
import {Box, Button, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
//@ts-ignore
import { Header, TopHeaderContent } from '@molecule';
import FLabelInput from '@/component/molecule/FloatingLabelInput/FLabelInput';

import RadioButton from '@molecule/RadioButton/RadioButton';
import { Card } from '@molecule/index';
import { getFontSizeByWindowHeight } from '@/style/theme';

const {MainBackIcon,AddrecipientIcon,AdbIIcon,FbnIcon,BankOfAfricaIcon,AbsaIcon,StanbicIcon,UbaIcon} = icon;
const USER_NUMBER = '065 801 6132'
const BuyDataAmount = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const {dataType} = route.params;
  const [selectedOption, setSelectedOption] = useState('A New Recepient');
  const [amount,setAmount] = useState<any>(0);
  const [mobileNumber,setMobileNumber] = useState<any>('');
  const options = [
    {multiText: 'For Me',label:USER_NUMBER},
    {label: 'A New Recepient'}
  ];
  const suggestedAmounts = [100,300,500];
  useEffect(() => {
    if(selectedOption !== 'A New Recepient'){
      setMobileNumber(USER_NUMBER)
    }
  },[selectedOption]);
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
          title={"Buy Airtime"}
          titleStyle={{color: colors.sunshineYellow}}
        />
      </Header>
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,paddingTop:24}}>
        <Box style={{paddingLeft:24,paddingRight:24}}>
            <Card style={{borderWidth:1,borderColor:'rgba(232, 232, 232, 1)',borderRadius:20,padding:24}}>
              <Box style={{flexDirection:'row'}}>
                <Box>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} variant={'extraSmall'}>selected</Text>
                  <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'} fontSize={14}>{dataType.type}</Text>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} variant={'extraSmall'}>{dataType.info}</Text>
                  <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={18}>{dataType.amount}</Text>
                </Box>
                <Box style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                  <TouchableOpacity style={{borderWidth:1,borderColor:colors.momoBlue,borderRadius:30,padding:7,alignItems:'center',width:100}}>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'momoBlue'} fontSize={getFontSizeByWindowHeight(12)}>Change</Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Card>
            <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} marginTop={'vm'} fontSize={14}>How much airtime would you like to buy?</Text>
            <Box style={{paddingTop:20}}>
                <FLabelInput labelBackgroundColor="white"
                    label="Enter Amount"
                    required
                    keyboardType='number-pad'
                    value={amount ? amount : ''}
                    onBlur={() => {
                        if(amount !== "") {
                            setAmount("GHc "+amount)
                        }
                    }}
                    onChangeText={(value)=>{setAmount(parseFloat(value))}}
                />
            </Box>
            <Text fontFamily={'MTNBrighterSans-Regular'} fontSize={10} color={'grey'} marginTop={'hxs'} variant={'extraSmall'}>You can enter any amount from GHc 0.03 to GHc 299</Text>
            <Box style={{marginTop:10,flexDirection:'row',justifyContent:'space-between'}}>
                {suggestedAmounts.map((amount) => 
                  <TouchableOpacity onPress={() => setAmount('GHc '+amount)} key={amount} style={{backgroundColor:colors.momoBlue,borderRadius:30,padding:7,minWidth:'30%',alignItems:'center'}}>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'white'} fontSize={14}>GHc {amount}</Text>
                  </TouchableOpacity>
                )}
            </Box>
            <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} marginTop={'hl'} fontSize={14}>Who is this airtime for?</Text>
            <Box style={{marginTop:24}}>
                <RadioButton
                    options={options}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    showLabel
                    containerStyle={{
                        flexDirection: 'column',
                    }}
                />
            </Box>
            {selectedOption === 'A New Recepient' &&
                <Box style={{paddingTop:20}}>
                    <FLabelInput labelBackgroundColor="white"
                        label="Mobile Number"    
                        required
                        keyboardType='phone-pad'
                        value={mobileNumber ? mobileNumber : ''}
                        onChangeText={(value)=>{setMobileNumber(value)}}
                        rightComponent={"AddrecipientIcon"}
                    />
                </Box>
            }
        </Box>
      </ScrollView>
      <Box style={{padding:24}}>
        <Button
            bStyle={{marginRight:10}}
            onPress={() => {
              navigation.navigate("ReviewAndPay",{amount,mobileNumber,selectedOption})
            }}
            label="Continue"
            variant="primary"
            size="fullWidth"
            disabled = {amount === '' || mobileNumber === '' || mobileNumber.length < 10}
        />
      </Box>
    </SafeAreaContainer>
  );
};

export default BuyDataAmount;