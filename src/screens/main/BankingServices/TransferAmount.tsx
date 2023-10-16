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
import FLabelInput from '@/component/molecule/FloatingLabelInput/FLabelInput';
import { renderItem } from '@molecule/Dropdown/Dropdown.stories';
import Dropdown from '@molecule/Dropdown/DropdownSearch';
import DateRange from '@molecule/Dropdown/DateRange';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setFilters } from '@/features/transactions/transactionSlice';
import QuickAction from '@molecule/Card/QuickAction';
import { Card } from '@molecule/index';
import RadioButton from '@molecule/RadioButton/RadioButton';

const {MainBackIcon,CalenderLeftNav,AdbIIcon,FbnIcon,BankOfAfricaIcon,AbsaIcon,StanbicIcon,UbaIcon} = icon;
const TransferAmount = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const {headerTitle,bankName,balance,accountNumber} = route.params;
  const [selectedOption, setSelectedOption] = useState('Transfer To Bank Account');
  const [amount,setAmount] = useState<any>(0);
  const [reference,setReference] = useState<any>('');
  const options = [
    {label: 'Transfer To Bank Account'},
    {label: 'Transfer From Bank Account'}
  ];
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
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,paddingTop:30}}>
        <Box style={{padding:24}}>
            <Card style={{height:132,borderWidth:1,borderColor:'rgba(232, 232, 232, 1)',borderRadius:20,padding:24}}>
                <Box style={{height:132/3}}>
                    <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Bank</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{bankName}</Text>
                </Box>
                <Box>
                    <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Account Number</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{accountNumber}</Text>
                </Box>
            </Card>
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
            <Box style={{paddingTop:40}}>
                <FLabelInput labelBackgroundColor="white"
                    label="Amount"
                    required
                    keyboardType='number-pad'
                    value={amount ? amount : ''}
                    onBlur={() => setAmount("GHc "+amount)}
                    onChangeText={(value)=>{setAmount(parseFloat(value))}}
                />
            </Box>
            <Box style={{paddingTop:20}}>
                <FLabelInput labelBackgroundColor="white"
                    label="Reference"    
                    required
                    value={reference ? reference : ''}
                    onChangeText={(value)=>{setReference(value)}}
                />
            </Box>
        </Box>
      </ScrollView>
      <Box style={{padding:24}}>
        <Button
            bStyle={{marginRight:10}}
            onPress={() => {
              navigation.navigate("TransferConfirmation",{headerTitle,amount,reference,selectedOption,bankName,accountNumber})
            }}
            label="Next"
            variant="primary"
            size="fullWidth"
            disabled = {amount === '' || reference === ''}
        />
      </Box>
    </SafeAreaContainer>
  );
};

export default TransferAmount;