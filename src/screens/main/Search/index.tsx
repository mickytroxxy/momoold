import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {ScrollView,View} from 'react-native';

import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';

import {getFontSizeByWindowWidth} from '@/style/theme';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import Dropdown, { selectRenderItemType } from '@/component/molecule/Dropdown/DropdownSearch';
import { Header, TopHeaderContent } from '@molecule';
import FLabelInput from '@/component/molecule/FloatingLabelInput/FLabelInput';
import TabScene from '../Transactions/TabScene';
import TransactionList from '../Transactions/TransactionList';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { transactionType } from '../Transactions/Type';

const Search = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const {MainBackIcon, MainSearchIcon, SearchIcon} = icon;
  const {transactions:transactionData} = useSelector((state: RootState) => state.transactionReducer);
  const transactions:transactionType[] = transactionData;
  const [searchValue,setSearchValue] = useState<any>(null);
  const filteredArray = transactions?.filter(item => (JSON.stringify(item.fromUser).includes(searchValue) || JSON.stringify(item.user).includes(searchValue)))
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
          title="Search"
          titleStyle={{color: colors.sunshineYellow}}
        />
      </Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box style={{padding:10,paddingTop:40}}>
          <FLabelInput labelBackgroundColor="white"
            label="Search"
            value={searchValue ? searchValue : ''}
            onChangeText={(value)=>{setSearchValue(value)}}
            leftComponent={<SearchIcon color={colors.grey} />}
          />
        </Box>
        {(!searchValue || searchValue == '') && <Text textAlign={'center'} padding={"hl"}>Try searching for a mobile number or transaction reference.</Text>}
        <TransactionList fromComponent='search' data={filteredArray} />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Search;