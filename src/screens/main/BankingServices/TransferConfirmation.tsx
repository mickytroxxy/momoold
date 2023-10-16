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
import { formatDate } from '../Transactions/TransactionList';

const {MainBackIcon,CalenderLeftNav,TransactionSharpIcon,CloseCircleIcon  } = icon;
const TransferConfirmation = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const {headerTitle,bankName,reference,selectedOption,amount,accountNumber} = route.params;
  const [showPinModal,setShowPinModal] = useState(false)
  const [pin,setPin] = useState('');
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
            <Card style={{height:333,borderWidth:1,borderColor:'rgba(232, 232, 232, 1)',borderRadius:20,padding:24}}>
                <Box style={{height:50}}>
                    <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'} fontSize={18}>Confirm Details</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'momoBlue'} fontSize={14}>{selectedOption}</Text>
                </Box>
                <Box style={{height:50}}>
                    <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Date</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{formatDate(Date.now())}</Text>
                </Box>
                <Box style={{height:50}}>
                    <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Bank</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{bankName}</Text>
                </Box>
                <Box style={{height:50}}>
                    <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Account Number</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{accountNumber}</Text>
                </Box>
                <Box style={{height:50}}>
                    <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Amount</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{amount}</Text>
                </Box>
                <Box style={{height:50}}>
                    <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Reference</Text>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{reference}</Text>
                </Box>
            </Card>
        </Box>
      </ScrollView>
      <Box style={{padding:24}}>
        <Button
            bStyle={{marginRight:10}}
            onPress={() => setShowPinModal(!showPinModal)}
            label="Transfer"
            variant="primary"
            size="fullWidth"
            disabled = {amount === '' || reference === ''}
        />
      </Box>
      {showPinModal && 
        <Box style={{position:'absolute',width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.3)',padding:24,alignItems:'center',justifyContent:'center'}}>
            <Card style={{height:320,borderRadius:20}}>
                <Box style={{alignItems:'flex-end',padding:12}}><TouchableOpacity onPress={() => setShowPinModal(!showPinModal)}><CloseCircleIcon /></TouchableOpacity></Box>
                <Box>
                    <Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} color={'momoBlue'} fontSize={18}>Enter Your Pin</Text>
                    <Text fontFamily={'MTNBrighterSans-Regular'} textAlign={'center'} padding={'vl'} color={'grey'} fontSize={14}>Please enter your MoMo Business PIN to proceed</Text>
                </Box>
                <Box style={{paddingLeft:24,paddingRight:24}}>
                    <FLabelInput labelBackgroundColor="white"
                        label="PIN"
                        required
                        keyboardType='number-pad'
                        value={pin ? pin : ''}
                        isPassword
                        maxLength={5}
                        onChangeText={(value)=>{setPin(value)}}
                    />
                </Box>
                <Box style={{padding:24}}>
                    <Button
                        bStyle={{marginRight:10}}
                        onPress={() => {navigation.navigate("TransactionDone",{fromScreen:'TRANSACTION',obj:{amount,selectedOption,bankName,accountNumber}})}}
                        label="Next"
                        variant="primary"
                        size="fullWidth"
                        disabled = {pin.length < 5}
                    />
                </Box>
            </Card>
        </Box>
      }
    </SafeAreaContainer>
  );
};

export default TransferConfirmation;