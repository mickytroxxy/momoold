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

const {MainBackIcon} = icon;
const dropDownData = [
  {label:'PAYMENTS',value:'PAYMENTS'},
  {label:'COMMISSIONS',value:'COMMISSIONS'},
  {label:'TRANSFERS',value:'TRANSFERS'},
  {label:'REFUNDS',value:'REFUNDS'}
]
const Filter = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const dispatch = useDispatch();
  const {headerTitle} = route.params;
  const {filters} = useSelector((state: RootState) => state.transactionReducer);
  const [amounts,setAmounts] = useState<any[]>([{btn:'From',value:''},{btn:'To',value:''}]);

  const handleAmounts = (val:any,btn:any) => {
    val = val === '' ? 0 : parseFloat(val);
    const data = amounts.map(data => data.btn === btn ? {...data,value:val} : {...data})
    setAmounts(data);
    dispatch(setFilters(filters.map((item:any) => item.type === 'amounts' ? {...item,value:data} : item)))
  }
  
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
        <Box>
          <Text color={'momoBlue'} fontFamily={'MTNBrighterSans-Bold'} fontSize={18} lineHeight={23.4}>Filter Transactions</Text>
          <Text fontFamily={'MTNBrighterSans-Bold'} style={{marginTop:20,marginBottom:10}} fontSize={14} lineHeight={18}>Custom Date Range</Text>
        </Box>
        <DateRange onRangeSelected={res => dispatch(setFilters(filters.map((item:any) => item.type === 'dates' ? {...item,value:res} : item)))}/>
        <Box zIndex={-1} style={{marginTop:30}}>
          <Text fontFamily={'MTNBrighterSans-Bold'} style={{marginBottom:15}} fontSize={14} lineHeight={18}>Transaction Type</Text>
          <Dropdown
            renderItem={renderItem}
            data={dropDownData}
            paddingContainer="hm"
            onSelect={e => dispatch(setFilters(filters.map((item:any) => item.type === 'transactionType' ? {...item,value:e.value} : item)))}
            value={''}
            placeHolder={'Select Transaction Type'}
            label="Select Transaction Type"
          />
        </Box>
        <Box zIndex={-2} style={{marginTop:20}}>
          <Text fontFamily={'MTNBrighterSans-Bold'} style={{marginBottom:15}} fontSize={14} lineHeight={18}>Amount</Text>
          <Box style={{flexDirection:'row',justifyContent:'space-between'}}>
              {amounts.map((item,i) => (
                <View key={i} style={{width:'45%'}}>
                  <FLabelInput labelBackgroundColor="white"
                    label={item.btn}
                    value={item.value.toString()}
                    onChangeText={(val)=>{handleAmounts(val,item.btn)}}
                    leftComponent={<Text>GH</Text>}
                  />
                </View>
              ))}
          </Box>
        </Box>
      </ScrollView>
      <Box style={{padding:24}}>
        <Button
            bStyle={{marginRight:10}}
            onPress={() => {
              navigation.goBack()
            }}
            label="Apply"
            variant="primary"
            size="fullWidth"
        />
      </Box>
    </SafeAreaContainer>
  );
};

export default Filter;