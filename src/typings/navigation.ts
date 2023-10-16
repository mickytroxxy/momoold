import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  homescreen: undefined;
  emptyscreen: undefined;
};
export type RootStackParams = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParams = {
  Onboarding: undefined;
  login: undefined;
  signup: undefined;
  SelectCountry: undefined;
};
export type HomeStackParams = {
  HomeScreen: undefined;
  SelectCountry: undefined;
  Transactions: undefined;
  TransactionsFilter: undefined;
  TransactionsSearch: undefined;
  BankingServices: undefined;
  TransferAmount: undefined;
  TransferConfirmation: undefined;
  TransactionDone:undefined;
  Recharge:undefined;
  MakeMoney:undefined;
  BuyAirtime:undefined;
  ReviewAndPay:undefined;
  BuyData:undefined;
  BuyVoice:undefined;
  BuyDataAmount:undefined;
};
export type HomeScreenStackParams = {
  home: undefined;
  empty: undefined;
};

export type TransferScreenStackParams = {
  transfer: undefined;
  transactions: undefined;
  empty: undefined;
};

export type OnboardingScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, 'Onboarding'>,
  NativeStackScreenProps<RootStackParams>
>;
