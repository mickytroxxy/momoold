import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet,TouchableOpacity,View} from 'react-native';
import {Text} from '@/component/atom';
import icon from '@/constants/icon';
//@ts-ignore
import {Card } from '@molecule';
import { gpsh } from '@/utils/parseTokenStyle';

type ItemListType = {
    subtitle?:string;
    maintitle:string;
    selected?:boolean;
    id:number;
}
type PropsType = {
    onSelected: (args:any) => void;
    itemList?:ItemListType[];
    placeholder?:string;
    required?:boolean;
}
const {DropdownCloseIcon,DropdownOpenIcon} = icon;
export const BusinessDropdownMulti = (props:PropsType) => {
  const {colors} = useTheme<Theme>();
  const [isItemListShown,setIsItemListShown] = useState<boolean>(false);
  const [listItems,setListItems] = useState<ItemListType[]>([])
  const selectedOption = listItems?.filter(item => item.selected)?.[0]
  const handleChange = useCallback((item:ItemListType) => {
    setListItems(listItems.map(data => data.id === item.id ? {...data,selected:true} : {...data,selected:false}));
    setIsItemListShown(false);
    props.onSelected(item)
  },[listItems])
  useEffect(() => {
    const list:ItemListType[] = props?.itemList || []
    setListItems(list)
  },[])
  return (
    <View style={{flex:1}}>
        <TouchableOpacity onPress={() => setIsItemListShown(!isItemListShown)} style={{borderWidth:1,justifyContent:'center',flexDirection:'row',borderColor: isItemListShown ? colors.momoBlue : '#525252',height:66,borderRadius:15,width:'100%'}}>
            <View style={{flex:1,justifyContent:'center',marginLeft:gpsh('16')}}>
                {selectedOption?.subtitle && <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>{selectedOption?.subtitle}</Text>}
                <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={14}>{selectedOption?.maintitle}</Text>
            </View>
            <View style={{marginRight:gpsh('16'),justifyContent:'center'}}>
                {!isItemListShown ? <DropdownCloseIcon/> : <DropdownOpenIcon/>}
            </View>
        </TouchableOpacity>
        {isItemListShown &&
            <View style={{marginTop:70,position:'absolute',width:'100%',zIndex:1}}>
                <Card elevation={10} borderRadius={15}>
                    {listItems?.map((item,i) => 
                        <TouchableOpacity onPress={()=> handleChange(item)} key={i} style={[{flex:1,justifyContent:'center',backgroundColor:item.selected ? '#E9EFF0' : colors.white,padding:gpsh('16')},i === 0 && styles.selectedIsFirst,i === listItems.length - 1 && styles.selectedIsLast]}>
                            {item.subtitle && <Text fontFamily={'MTNBrighterSans-Regular'} color={'grey'} fontSize={12}>{item.subtitle}</Text>}
                            <Text fontFamily={'MTNBrighterSans-Bold'} color={'momoBlue'} fontSize={14}>{item.maintitle}</Text>
                        </TouchableOpacity>
                    )}
                </Card>
            </View>
        }
    </View>
  );
};



export const BusinessDropdownSingle = (props:PropsType) => {
    const {colors} = useTheme<Theme>();
    const [isItemListShown,setIsItemListShown] = useState<boolean>(false);
    const [listItems,setListItems] = useState<ItemListType[]>([])
    const selectedOption = listItems?.filter(item => item.selected)?.[0]
    const handleChange = useCallback((item:ItemListType) => {
      setListItems(listItems.map(data => data.id === item.id ? {...data,selected:true} : {...data,selected:false}));
      setIsItemListShown(false);
      props.onSelected(item)
    },[listItems])
    useEffect(() => {
      const list:ItemListType[] = props?.itemList || []
      setListItems(list)
    },[])
    return (
        <View style={{flex:1}}>
            {selectedOption && <View style={{backgroundColor:colors.white,marginTop:-10,padding:4,left:16,zIndex:10,position:'absolute'}}><Text fontFamily={'MTNBrighterSans-Medium'} fontSize={10} variant={'extraSmall'} color={'black'}>{props.placeholder} {props.required && '*'}</Text></View>}
            <TouchableOpacity onPress={() => setIsItemListShown(!isItemListShown)} style={[{justifyContent:'center',flexDirection:'row',backgroundColor:colors.white,borderColor: isItemListShown ? colors.momoBlue : '#525252',height:66,width:'100%'},!isItemListShown && styles.isHidden, isItemListShown && styles.isNotHidden]}>
                <View style={{flex:1,justifyContent:'center',marginLeft:gpsh('16')}}>
                    <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{`${selectedOption ? selectedOption?.maintitle : props.placeholder} ${(!selectedOption && props.required) ? '*' : ''}`}</Text>
                </View>
                <View style={{marginRight:gpsh('16'),justifyContent:'center'}}>
                    {!isItemListShown ? <DropdownCloseIcon/> : <DropdownOpenIcon/>}
                </View>
            </TouchableOpacity>
            {isItemListShown &&
                <View style={[{marginTop:66,backgroundColor:colors.white,position:'absolute',width:'100%',zIndex:1,borderLeftWidth:1.5,borderBottomWidth:1.5,borderRightWidth:1.5,borderColor:colors.momoBlue},styles.selectedIsLast]}>
                    <ScrollView>
                        {listItems?.map((item,i) => 
                            <TouchableOpacity onPress={()=> handleChange(item)} key={i} style={[{flex:1,justifyContent:'center',backgroundColor:item.selected ? colors.extraLightGrey : colors.white,padding:gpsh('16')},i === listItems.length - 1 && styles.selectedIsLast]}>
                                <Text fontFamily={'MTNBrighterSans-Medium'} color={'black'} fontSize={14}>{item.maintitle}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
            }
      </View>
    );
};
const styles = StyleSheet.create({
    selectedIsFirst:{
        borderTopLeftRadius:10,borderTopRightRadius:10
    },
    selectedIsLast:{
        borderBottomLeftRadius:10,borderBottomRightRadius:10
    },
    isHidden:{
        borderWidth:1,borderRadius:15
    },
    isNotHidden:{
        borderWidth:2,borderTopLeftRadius:15,borderTopRightRadius:15,top:2.5
    }
});