import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Box, Button, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import { Header, TopHeaderContent } from '@molecule';
import FLabelInput from '@/component/molecule/FloatingLabelInput/FLabelInput';
import RadioButton from '@molecule/RadioButton/RadioButton';
import { Card, Pills } from '@molecule/index';
import { getFontSizeByWindowHeight, getFontSizeByWindowWidth } from '@/style/theme';
import { View } from 'react-native-animatable';
import Tab from '@molecule/Tab/Tab';
import { useNavigation } from '@react-navigation/native';
import Bundle from '@molecule/Card/Bundle';
import { cardsBundleBottomMargin } from '@/style-dictionary-dist/momoStyle';
import { gpsh } from '@/utils/parseTokenStyle';
const {MainBackIcon, DataIcon} = icon;
let router:any;
const tabData = [
  {
    title: 'Basics',
    renderScene: () => <TabScene />,
  },
  {
    title: 'Social Bundles',
    renderScene: () => <TabScene/>,
  },
  {
    title: 'Video',
    renderScene: () => <TabScene/>,
  },
];
export const list = [
  {type:'Flexi Bundle',validity:'7',info:'1MB - 216GB', amount:'GHc 0.03 - 299',durationType:'Daily'},
  {type:'5 GB Data Bundle',validity:'30', amount:'ZAR 200',durationType:'Weekly'},
  {type:'500 MB Data Bundle',validity:'15', amount:'ZAR 500',durationType:'Weekly'},
  {type:'50 GB Data Bundle',validity:'30', amount:'ZAR 750',durationType:'Monthly'},
]
const TabScene = () => {
  const {colors} = useTheme<Theme>();
  const {navigate} = useNavigation();
  return(
    <Box style={{paddingLeft:24,paddingRight:24}}>
      {list.map((item,i) => 
        <Card elevation={10}  key={i} style={{marginTop:gpsh(cardsBundleBottomMargin),borderWidth: i === 0 ? 2 : 0, borderColor:colors.sunshineYellow,borderRadius:10}}>
          <Bundle onPress={() => {router?.navigate("BuyDataAmount",{dataType:item})}} type={item.type} durationType={item.durationType} validity={item.validity} amount={item.amount}/>
        </Card>
      )}
      
    </Box>
  )
}
const BuyData = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  router = navigation;
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
          title={"Buy Data"}
          titleStyle={{color: colors.sunshineYellow}}
        />
      </Header>
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,paddingTop:24}}>
        <Box style={{paddingLeft:24,paddingRight:24}}>
          <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={getFontSizeByWindowWidth(14)}>Popular Bundle</Text>
          <Card elevation={30} style={{padding:24,marginTop:12}}>
            <Box style={{flexDirection:'row'}}>
              <Box><DataIcon fill={colors.momoBlue} width={16} /></Box>
              <Box style={{flex:1,marginLeft:12,justifyContent:'center'}}><Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={getFontSizeByWindowHeight(14)}>250 MB Whatsapp Data Bundle</Text></Box>
            </Box>
            <Box style={{flexDirection:'row',marginTop:10}}>
              <Box style={{flexDirection:'row',height:30,marginTop:20}}>
                <Box style={{justifyContent:'center'}}>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={getFontSizeByWindowHeight(12)}>Data</Text>
                  <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'} fontSize={getFontSizeByWindowHeight(14)}>250</Text>
                </Box>
                <Box style={{justifyContent:'center',marginLeft:24,paddingLeft:24,borderLeftColor:colors.grey,borderLeftWidth:0.5}}>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={getFontSizeByWindowHeight(12)}>Cost</Text>
                  <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'} fontSize={getFontSizeByWindowHeight(14)}>GHc 253</Text>
                </Box>
              </Box>
              <Box style={{flex:1,}}>
                <Box style={{flexDirection:'row',justifyContent:'center'}}>
                  <Pills label={'Social'} pillType="bundles" size="medium" />
                  <Box style={{marginLeft:5}}><Pills label={'Bundles'} pillType="bundles" size="medium" /></Box>
                </Box>
                <Box style={{marginTop:12,alignItems:'center'}}>
                  <TouchableOpacity style={{borderWidth:1,borderColor:colors.momoBlue,borderRadius:30,padding:7,alignItems:'center',width:100}}>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'momoBlue'} fontSize={getFontSizeByWindowHeight(12)}>Buy Now</Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          </Card>
          <Box style={{marginTop:24}}>
            <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={getFontSizeByWindowHeight(14)}>Select Data Bundle</Text>
          </Box>
        </Box>
        <View style={{marginTop:10}}>
          <Tab mH={24} tabData={tabData} />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default BuyData;