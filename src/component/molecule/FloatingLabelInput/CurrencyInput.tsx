import {View, Text, StyleProp, ViewStyle, TextInputProps} from 'react-native';
import React, {forwardRef, useRef} from 'react';
import {Box} from '@atom';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import {TextInput} from 'react-native';

type CurrencyInputType = TextInputProps & {
  containerStyle: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  inputStyle: StyleProp<ViewStyle>;
  leftComponent: string;
  rightComponent: string;
  onChange: (text: string) => void;
  secureTextEntry: string;
  keyboardType: string;
};

const CurrencyInput = forwardRef(
  (
    {
      containerStyle,
      label,
      placeholder,
      inputStyle,
      leftComponent,
      rightComponent,
      onChange,
      secureTextEntry,
      keyboardType,
    //   keyboardType = 'default',
      error,
      ...props
    }: CurrencyInputType,
    ref,
  ) => {
    const {colors} = useTheme<Theme>();
    const inputRef = useRef<TextInput| null>(null)
    return (
      <Box style={[containerStyle]}>
        <Box
          flexDirection={'row'}
          borderWidth={1}
          flex={1}
          borderColor={
            //   !visible ? 'transparent' : hasError ? 'red100' : 'momoBlue'
          }
          borderRadius={14}>
          <TextInput
            ref={inputRef}
            // placeholderTextColor={hasError ? colors.red100 : colors.black}
            onChangeText={onChange}
            selectionColor={colors.momoBlue}
            placeholder="Search Here"
            // value={searchText || selected?.[displayKey]}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            // onFocus={() => {
            //   setIsFocus(true);
            //   openDropdown();
            // }}
            style={[
              {
                // backgroundColor: 'green',
                flex: 1,
                height: '100%',
                fontSize: 16,
                fontFamily: 'MTNBrighterSans-Regular',
                color: error ? colors.red100 : colors.black,
                borderWidth: 0,
              },
              inputStyle,
            ]}
            {...props}
          />
        </Box>
      </Box>
    );
  },
);

export default CurrencyInput;
