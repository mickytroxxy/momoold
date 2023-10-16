import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransferScreen from './TransferScreen';
import {TransferScreenStackParams} from '@/typings/navigation';
import Transactions from './TransferTabs/RecentlyPaid/Transactions';

const TransferScreenStack =
  createNativeStackNavigator<TransferScreenStackParams>();

const TransferScreenNavigator = () => {
  return (
    <TransferScreenStack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <TransferScreenStack.Screen name="transfer" component={TransferScreen} />
      <TransferScreenStack.Screen
        name="transactions"
        component={Transactions}
      />
    </TransferScreenStack.Navigator>
  );
};

export default TransferScreenNavigator;
