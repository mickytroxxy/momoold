import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';

const TxInput = () => {
  const {colors, spacing} = useTheme<Theme>();
  return (
    <View style={{marginTop: spacing.vs}}>
      <Text style={{color: colors.momoBlue}}>Full Name</Text>
      <TextInput
        style={{
          marginVertical: spacing.vxs,
          borderBottomColor: colors.momoBlue,
          borderBottomWidth: 1,
        //   borderTopWidth: 1,
          height: 30,
          color: colors.momoBlue,
        }}
        placeholder="Enter Full Name"
        placeholderTextColor={colors.momoBlue}
        selectionColor={colors.momoBlue}
      />
    </View>
  );
};

export default TxInput;
