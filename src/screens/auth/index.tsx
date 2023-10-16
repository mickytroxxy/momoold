import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from '../main/Homescreen/Homescreen';
import EmptyScreen from '../EmptyScreen';
import { AuthStackParams } from '../../typings/navigation';
import Login from './Login';
import SignUp from './Signup';

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerShown: false,
      }}>
      {/* <AuthStack.Screen name="Onboarding" component={EmptyScreen} /> */}
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
