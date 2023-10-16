import { HomeStackParams } from '@/typings/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '@/navigation/bottomTab/TabNavigator';
import Transactions from '@/screens/main/Transactions';
import Search from '@/screens/main/Search';
import Filter from '@/screens/main/Filter';
import BankingServices from '@/screens/main/BankingServices';
import TransferAmount from '@/screens/main/BankingServices/TransferAmount';
import TransferConfirmation from '@/screens/main/BankingServices/TransferConfirmation';
import TransactionDone from '@/screens/main/BankingServices/TransactionDone';
import Tabs from '@/navigation/bottomTab/bottomTab';
import MakeMoney from '@/screens/main/MakeMoney';
import BuyAirtime from '@/screens/main/MakeMoney/BuyAirtime';
import ReviewAndPay from '@/screens/main/MakeMoney/BuyAirtime/ReviewAndPay';
import BuyData from '@/screens/main/MakeMoney/BuyData';
import BuyDataAmount from '@/screens/main/MakeMoney/BuyData/BuyDataAmount';
const HomeStack = createNativeStackNavigator<HomeStackParams>();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={TabNavigator} />
      <HomeStack.Screen name="Transactions" component={Transactions} />
      <HomeStack.Screen name="TransactionsSearch" component={Search} />
      <HomeStack.Screen name="TransactionsFilter" component={Filter} />
      <HomeStack.Screen name="BankingServices" component={BankingServices} />
      <HomeStack.Screen name="TransferAmount" component={TransferAmount} />
      <HomeStack.Screen name="TransferConfirmation" component={TransferConfirmation} />
      <HomeStack.Screen name="TransactionDone" component={TransactionDone} />
      <HomeStack.Screen name="MakeMoney" component={MakeMoney} />
      <HomeStack.Screen name="BuyAirtime" component={BuyAirtime} />
      <HomeStack.Screen name="ReviewAndPay" component={ReviewAndPay} />
      <HomeStack.Screen name="BuyData" component={BuyData} />
      <HomeStack.Screen name="BuyDataAmount" component={BuyDataAmount} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
