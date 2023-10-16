import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {Dimensions,View} from 'react-native';
import {Box, Button, Text} from '@/component/atom';
import icon from '@/constants/icon';
import {getFontSizeByWindowWidth} from '@/style/theme';
import {Card } from '@molecule';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PropsType = {
    onRangeSelected: (args:any) => void;
}
const {width,height} = Dimensions.get("screen")
const {CalenderLeftNav,CalenderRightNav} = icon;
const defaultRangeData = {show:false,data:[{btn:'From',value:'From',selected:false,timeStamp:0},{btn:'To',value:'To',selected:false,timeStamp:0}]}

const DateRange = (props:PropsType) => {
  const {colors, spacing} = useTheme<Theme>();
  const {onRangeSelected} = props;
  const [rangeData,setRangeData] = useState(defaultRangeData)
  const selectedBtn = rangeData.data.filter(item => item.selected)[0]

  const handleDateSelect = (item:any) => {
    const data = rangeData.data.map(data => data.btn === item.btn ? {...data,selected:true} : {...data,selected:false})
    setRangeData(prevState => ({...prevState,show:true,data}))
  }
  const handleCalenderDone = () => {
    onRangeSelected(rangeData);
    setRangeData(prevState => ({...prevState,show:false}))
  }
  const getMarked = () => {
    let marked:any = {};
    for(let i = 1; i <= 10; i++) {
      let day = i.toString().padStart(2, '0');
      marked[`2022-12-${day}`] = {
        startingDay: i == 1,
        endingDay: i == 10,
        color: 'yellow',
        textColor: '#aaa',
        disabled: true,
        marked:true,
        dot:false
      };
    }
    return marked;
  };
  return (
    <View>
        <Box style={{flexDirection:'row',justifyContent:'space-between'}}>
            {rangeData.data.map((item,i) => (
                <View key={i} style={{width:'45%'}}>
                    {item.value !== item.btn && <View style={{position:'absolute',top:-12,padding:4,left:10,backgroundColor:colors.white,zIndex:10,alignItems:'center'}}><Text fontFamily={'MTNBrighterSans-Medium'} fontSize={12}>{item.btn}:</Text></View>}
                    <TouchableOpacity onPress={() => handleDateSelect(item)} style={{padding:20,borderWidth:1,borderRadius:15,justifyContent:'center',alignItems:'center'}}><Text>{item.value}</Text></TouchableOpacity>
                </View>
            ))}
        </Box>

        {rangeData.show && 
            <View style={{position:'absolute',flex:1,justifyContent:'center',paddingLeft:30,paddingRight:30,width:width,marginLeft:-24,marginTop:-190,height:height,backgroundColor:'rgba(0,0,0,0.5)'}}>
                <Card style={{borderRadius:20,padding:10,paddingBottom:30}}>
                    <Calendar
                        style={{borderRadius:20}}
                        headerStyle={{backgroundColor:'momoBlue'}}
                        renderHeader={(props) => {
                            const formattedDate = new Date(props).toLocaleString('default', {
                                month: 'long',
                                year: 'numeric',
                            });
                            return(
                                <View><Text color={'momoBlue'}>{formattedDate}</Text></View>
                            )
                        }}
                        onDayPress={day => {
                            setRangeData({show:selectedBtn.btn === 'To',data:rangeData.data.map(data => data.selected === true ? {...data,value:day.dateString,timeStamp:day.timestamp} : data)})
                        }}
                        markingType="period"
                        markedDates={getMarked()}
                        renderArrow={directions => _renderArrow(directions,colors)}
                        
                    />
                    <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                        <Button
                            bStyle={{marginRight:10}}
                            onPress={() => setRangeData(defaultRangeData)}
                            label="Reset"
                            variant="secondary"
                            size="fullWidth"
                        />
                        <Button
                            bStyle={{alignSelf: 'flex-end'}}
                            onPress={handleCalenderDone}
                            label="Done"
                            variant="primary"
                            size="fullWidth"
                            disabled = {selectedBtn.btn === 'From'}
                        />
                    </View>
                </Card>
            </View>
        }
    </View>
  );
};
const _renderArrow = (direction: 'left' | 'right',colors:any) => {
  if (direction === 'left') {
    return (
      <CalenderRightNav
        width={getFontSizeByWindowWidth(20)}
        height={getFontSizeByWindowWidth(20)}
        stroke={colors.momoBlue}
      />
    );
  } else {
    return (
      <CalenderLeftNav
        width={getFontSizeByWindowWidth(20)}
        height={getFontSizeByWindowWidth(20)}
        stroke={colors.momoBlue}
      />
    );
  }
};
export default DateRange;