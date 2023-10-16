import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useState} from 'react';
import {KeyboardTypeOptions, StyleSheet,TextInput,View} from 'react-native';
import {Text} from '@/component/atom';
import icon from '@/constants/icon';
import { gpsh } from '@/utils/parseTokenStyle';

type PropsType = {
    onChangeText: (args:any) => void;
    leftComponent?:() => any;
    rightComponent?:() => any;
    value?:string;
    placeholder?:string;
    required?:boolean;
    keyboardType?:KeyboardTypeOptions
}

export const BusinessTextInput = (props:PropsType) => {
    const {colors} = useTheme<Theme>();
    const [isFocus,setIsFocus] = useState<boolean>(false);
    const [value,setValue] = useState<any>('')
    useEffect(() => {
        props.value && setValue(props.value);
    },[])
    return (
        <View style={{flex:1}}>
            {(value && !isFocus) && <View style={{backgroundColor:colors.white,marginTop:-10,padding:4,left:16,zIndex:10,position:'absolute'}}><Text fontFamily={'MTNBrighterSans-Regular'} fontSize={12} variant={'extraSmall'} color={'grey'}>{props.placeholder} {props.required && '*'}</Text></View>}
            <View style={{flexDirection:'row',height:66,borderWidth: isFocus ? 2 : 1,borderRadius:20,borderColor: isFocus ? colors.momoBlue : colors.grey}}>
                <View style={{justifyContent:'center',marginLeft:16}}>{props.leftComponent && props.leftComponent()}</View>
                <View style={{flex:1,justifyContent:'center'}}>
                    <TextInput
                        onFocus={() => setIsFocus(!isFocus)}
                        value={value}
                        placeholder={`${props.placeholder} ${props.required && '*'}`} onChangeText={(value) => {
                            props.onChangeText(value);
                            setValue(value)
                        }}
                        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                        onBlur={() => setIsFocus(false)}
                        style={{fontFamily:'MTNBrighterSans-Regular',marginTop:5,fontWeight:'600',fontSize:16,width:'100%'}}
                    />
                </View>
                <View style={{justifyContent:'center',marginRight:gpsh('16')}}>{props.rightComponent && props.rightComponent()}</View>
            </View>
      </View>
    );
};