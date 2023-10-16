import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';


import {Box, Text} from '@/component/atom';
import icon from '@/constants/icon';
import SafeAreaContainer from '@/component/atom/SafeAreaContainer';
import {moderateScale} from 'react-native-size-matters';
import { TouchableOpacity, TouchableHighlight } from 'react-native';
//@ts-ignore
import { Card, CurvedHeaderBg, TopHeaderContent } from '@molecule';
import Bundle from '@molecule/Card/Bundle';

export const list = [
  {type:'500 MB Data Bundle',validity:'7', amount:'ZAR 50',durationType:'Daily'},
  {type:'5 GB Data Bundle',validity:'30', amount:'ZAR 200',durationType:'Weekly'},
  {type:'500 MB Data Bundle',validity:'15', amount:'ZAR 500',durationType:'Weekly'},
  {type:'50 GB Data Bundle',validity:'30', amount:'ZAR 750',durationType:'Monthly'},
]
const MakeMoney = ({navigation}:any) => {
  const {colors} = useTheme<Theme>();
  const {AirtimesIcon,DataIcon,VoiceIcon,BusinessNotificationIcon,BuyPrepaidIcon, MainBackIcon} = icon;
  const ACTION_BTNS = [
    {name:'Buy Airtime',icon:AirtimesIcon,screen:'BuyAirtime'},{name:'Buy Data',icon:DataIcon,screen:'BuyData'},{name:'Buy Voice',icon:VoiceIcon,screen:'BuyAirtime'}
  ]
  return (
    <SafeAreaContainer bg={'primaryColor'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CurvedHeaderBg height={331}>
            <TopHeaderContent
              containerStyle={{paddingVertical: moderateScale(3),alignItems: 'flex-start'}}
              right={{rightComp: <BusinessNotificationIcon width={24} height={24} />}}
              left={{leftComp: <TouchableOpacity onPress={() => navigation.goBack()}><MainBackIcon /></TouchableOpacity>}}
              title='Make Money'
              titleStyle={{color: '#FFCB05'}}
            />
            
            <Box style={{margin:20,paddingTop:20}}>
              <Card style={{height:141,flexDirection:'row'}}>
                <Box style={{width:140}}>
                  <Box style={{left:15,top:-20}}><BuyPrepaidIcon /></Box>
                </Box>
                <Box style={{flex:1,padding:10,paddingTop:20}}>
                  <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={18}>Get Connected</Text>
                  <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>Buy or sell data bundles, airtime and voice bundles from the MoMo Business app.</Text>
                </Box>
              </Card>
              <Box style={{flexDirection:'row',alignItems:'center',marginTop:10,justifyContent:'center'}}>
                <View style={{width:10,height:10,borderRadius:100,backgroundColor:'white',margin:3}}></View>
                <View style={{width:10,height:10,borderRadius:100,backgroundColor:colors.sunshineYellow,margin:3}}></View>
                <View style={{width:10,height:10,borderRadius:100,backgroundColor:'white',margin:3}}></View>
              </Box>
              <Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} color={'white'} lineHeight={24} style={{marginTop:10}} fontSize={18}>What do you need to buy?</Text>
            </Box>
          </CurvedHeaderBg>

          <Box style={{marginTop:-50,paddingBottom:100}}>
            <Box style={{alignSelf:'center'}}>
              <Box style={{marginTop:5,justifyContent:'space-between',flexDirection:'row'}}>
                {ACTION_BTNS.map((item, i) => 
                  <TouchableOpacity style={{margin:5}} onPress={() => navigation.navigate(item.screen,{headerTitle:'Buy Airtime'})} key={i}>
                    <Card  variant={'shadow'} style={{width:96,height:96,borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor: 'white'}}>
                      <item.icon fill={colors.momoBlue}/>
                      <Box style={{paddingLeft:10,paddingRight:10}}><Text fontFamily={'MTNBrighterSans-Bold'} textAlign={'center'} fontSize={10} color={'momoBlue'}>{item.name}</Text></Box>
                    </Card>
                  </TouchableOpacity>
                )}
              </Box>
            </Box>
            <Box>
              <Box style={{flexDirection:'row',padding:24}}>
                <Box style={{flex:1}}><Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} lineHeight={24} fontSize={16}>Recently Purchased</Text></Box>
                <TouchableHighlight style={{justifyContent:'center'}}><Text variant={'extraSmall'} textDecorationLine={'underline'} textAlign={'center'} color={'momoBlue'}>View All</Text></TouchableHighlight>
              </Box>
              <Box style={{paddingLeft:24,paddingRight:24}}>
                {list.map((item,i) => 
                  <TouchableOpacity key={i} style={{marginTop:10}}>
                    <Card elevation={10}>
                      <Bundle type={item.type} durationType={item.durationType} validity={item.validity} amount={item.amount}/>
                    </Card>
                  </TouchableOpacity>
                )}
                
              </Box>
            </Box>
          </Box>
        </ScrollView>
    </SafeAreaContainer>
  );
};

export default MakeMoney;








