import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {ScrollView,View} from 'react-native';
import {Box, Button, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
import { Header, TopHeaderContent } from '@molecule';
import { Card } from '@molecule/index';
import { getFontSizeByWindowHeight } from '@/style/theme';
import { BusinessDropdownMulti } from '@molecule/Dropdown/BusinessDropdown';

const itemList = [
  {subtitle:'Main Account',maintitle:'GHc 469.00',value:469.00,id:1,selected:true},
  {subtitle:'MoMo Account Pay',maintitle:'GHc 976',value:976,id:2}
]
const {MainBackIcon,UserIconOutlined,CostOutlined  } = icon;
const ReviewAndPay = ({navigation,route}: any) => {
  const {colors} = useTheme<Theme>();
  const {mobileNumber,amount} = route.params;
  const [selectedOption,setSelectedOption] = useState<any>({label:'GHc 469',value:'45',header:'Main Account'})
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
          title={'Review And Pay'}
          titleStyle={{color: colors.sunshineYellow}}
        />
      </Header>
      <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,paddingTop:10}}>
        <Box style={{padding:24}}>
          <Card style={{borderWidth:1,borderColor:'rgba(232, 232, 232, 1)',borderRadius:20,padding:24}}>
              <Box style={{height:30,}}>
                <Text fontFamily={'MTNBrighterSans-Bold'} color={'black'} fontSize={18}>{amount} Airtime</Text>
              </Box>
              <Box style={{height:50,flexDirection:'row'}}>
                <Box style={{justifyContent:'center'}}><UserIconOutlined fill={colors.momoBlue}/></Box>
                <Box style={{flex:1,justifyContent:'center',marginLeft:15}}>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>For</Text>
                  <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{mobileNumber}</Text>
                </Box>
              </Box>
              <Box style={{height:50,flexDirection:'row'}}>
                <Box style={{justifyContent:'center'}}><CostOutlined fill={colors.momoBlue}/></Box>
                <Box style={{flex:1,justifyContent:'center',marginLeft:15}}>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Cost</Text>
                  <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{amount}</Text>
                </Box>
              </Box>
          </Card>
          <Box style={{marginTop:18}}>
            <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={getFontSizeByWindowHeight(14)}>Select Payment Method</Text>
            <View style={{marginTop:12}}>
              <BusinessDropdownMulti itemList={itemList} onSelected={(selected) => setSelectedOption(selected)}/>
            </View>
          </Box>
        </Box>
      </ScrollView>
      <View style={{paddingLeft:24,paddingRight:24,paddingBottom:12}}>
        <View>
          <Button
            bStyle={{marginRight:10}}
            onPress={() => {navigation.navigate("TransactionDone",{fromScreen:'BUYAIRTIME',obj:{amount,mobileNumber}})}}
            label="Pay"
            variant="primary"
            size="fullWidth"
          />
        </View>
        <View style={{marginTop:15}}>
          <Button
            bStyle={{marginRight:10}}
            onPress={() => navigation.goBack()}
            label="Cancel"
            variant="secondary"
            size="fullWidth"
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default ReviewAndPay;