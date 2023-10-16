import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {ScrollView,View} from 'react-native';
import {Box, Button, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import { Header, TopHeaderContent } from '@molecule';
import RadioButton from '@molecule/RadioButton/RadioButton';
import { BusinessTextInput } from '@molecule/Dropdown/BusinessTextInput';

const {MainBackIcon,AddrecipientIcon} = icon;
const USER_NUMBER = '065 801 6132'
const BuyAirtime = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
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
            <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={14}>How much airtime would you like to buy?</Text>
            <Box style={{paddingTop:30}}>
              <BusinessTextInput 
                placeholder='Enter Amount' 
                required={true} 
                //value={amount}
                onChangeText={(value) => {setAmount(parseFloat(value))}} 
                leftComponent={() => <Text fontFamily={'MTNBrighterSans-Regular'} color={'black'}>{amount ? 'GHc' : ''}</Text>}
              />
            </Box>
            <Box style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
              {suggestedAmounts.map((amount) => 
                <TouchableOpacity onPress={() => setAmount(amount)} key={amount} style={{backgroundColor:colors.momoBlue,borderRadius:30,padding:7,minWidth:'30%',alignItems:'center'}}>
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
                    <BusinessTextInput 
                      placeholder='Mobile Number' 
                      required={true} 
                      keyboardType='phone-pad'
                      value={mobileNumber}
                      onChangeText={(value) => {setMobileNumber(value)}} 
                      rightComponent={() => <AddrecipientIcon/>}
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

export default BuyAirtime;