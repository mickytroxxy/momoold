import Onboard from '@/screens/auth/Onboarding/Onboarding';
import SelectCountry from '@/screens/auth/Onboarding/SelectCountry';
import { AuthStackParams } from '@/typings/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator<AuthStackParams>();
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
        <AuthStack.Screen name="Onboarding" component={Onboard} />
        <AuthStack.Screen name="SelectCountry" component={SelectCountry} />
   
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
