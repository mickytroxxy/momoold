import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, { useState} from 'react';
import {ScrollView} from 'react-native';
import {Box, Button, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import TouchableOpacity from '@/component/atom/TouchableOpacity';
//@ts-ignore
import { Header, TopHeaderContent } from '@molecule';
import { renderItem } from '@molecule/Dropdown/Dropdown.stories';
import Dropdown from '@molecule/Dropdown/DropdownSearch';
import { Card } from '@molecule/index';
import { getFontSizeByWindowHeight } from '@/style/theme';


export const dropDownData = [
  {label:'GHc 469',value:'45',header:'Main Account'},
  {label:'GHc 976',value:'60',header:'MoMo Pay Account'}
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
            
            <Box marginTop={'vs'}>
              <Dropdown
                renderItem={renderItem}
                data={dropDownData}
                paddingContainer="hm"
                onSelect={e => setSelectedOption(e)}
                value={''}
                header={selectedOption.header}
                placeHolder={selectedOption.label}
                
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
      <Box zIndex={-10} style={{padding:24}}>
        <Box>
          <Button
            bStyle={{marginRight:10}}
            onPress={() => {navigation.navigate("TransactionDone",{fromScreen:'BUYAIRTIME',obj:{amount,mobileNumber}})}}
            label="Pay"
            variant="primary"
            size="fullWidth"
          />
        </Box>
        <Box style={{marginTop:15}}>
          <Button
            bStyle={{marginRight:10}}
            onPress={() => navigation.goBack()}
            label="Cancel"
            variant="secondary"
            size="fullWidth"
          />
        </Box>
      </Box>
    </SafeAreaContainer>
  );
};

export default ReviewAndPay;