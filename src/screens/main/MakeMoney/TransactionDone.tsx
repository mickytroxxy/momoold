import {Theme} from '@/typings/globalTheme';
import {color, useTheme} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {ScrollView,View, Image} from 'react-native';
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
import { Card, CurvedHeaderBg } from '@molecule/index';
import RadioButton from '@molecule/RadioButton/RadioButton';
import { formatDate } from '../Transactions/TransactionList';
import { SvgUri } from 'react-native-svg';

const {MainBackIcon,CalenderLeftNav,TransactionSharpIcon,MomoIcon  } = icon;
const TransactionDone = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const {headerTitle,bankName,reference,selectedOption,amount,accountNumber} = route.params;
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
        <Box style={{marginTop:-200}}>
            <Box style={{alignItems:'center'}}><Image source={require('../../../assets/images/transactionsdone.png')} style={{height:347,width:272}} /></Box>
            <Box style={{paddingLeft:24,paddingRight:24}}>
                <Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} color={'momoBlue'} fontSize={24}>Transaction Successful</Text>
                <Text fontFamily={'MTNBrighterSans-Medium'} textAlign={'center'}  color={'grey'} fontSize={14}>You have successfully transfered <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{amount}</Text> to <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{bankName}</Text> account <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'}>{accountNumber}</Text></Text>
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
                    onPress={() => {navigation.navigate("BankingServices")}}
                    label="Transfer Again"
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