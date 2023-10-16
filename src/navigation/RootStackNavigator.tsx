import TabNavigator from '@/navigation/bottomTab/TabNavigator';
import {RootStackParams} from '@/typings/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthNavigator';
import Snackbar from '@molecule/Alert/Alert';
import {useTypedSelector} from '@/store/store';
import {selectMessage} from '@/features/alert/alertSlice';
import HomeStackNavigator from './HomeStackNavigator';

const RootStack = createNativeStackNavigator<RootStackParams>();
const RootStackNavigator = () => {
  const message = useTypedSelector(selectMessage);
  console.log('message', message);
  return (
    <>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {true ? (
          <RootStack.Screen name="Main" component={HomeStackNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
      {message.length !== 0 && <Snackbar />}
    </>
  );
};

export default RootStackNavigator;
