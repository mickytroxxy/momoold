import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {PersistConfig} from 'redux-persist/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transactionType } from '@/screens/main/Transactions/Type';

export type UserAccountType = {
  type:string;
  accountId:number;
  balance:number;
  transactions:transactionType[]
}
export type TransactionFiltersType = {
  type:'dates' | 'amounts' | 'transactionType';
  value:any;
}
const userAccounts = [
  {
    type:'Main Account Balance',
    accountId:1,
    balance:13760.40,
    transactions:[
      {fromUser:'Momo Account Pay',amount:608,time:(Date.now() - (2 * 86400000)),user:'Momo Account',type:'Refund', transactionType:'MONEY_IN'},
      {fromUser:'+27658016035',amount:808,time: (Date.now()), transactionType:'MONEY_OUT',user:'Gift Manyama',type:'Refund'},
      {fromUser:'+27658016088',amount:66,time:(Date.now()), transactionType:'MONEY_OUT',user:'Momo Pay',type:'Cash Send'},
      {fromUser:'Withdrawal',amount:808,time:(Date.now()), transactionType:'MONEY_IN',user:'Momo Account',type:'Cash In'},
      {fromUser:'+27658016099',amount:808,time:(Date.now() - 86400000), transactionType:'MONEY_OUT',user:'Niresh Com',type:'Transfer'},
      {fromUser:'+27658016080',amount:787,time:(Date.now() - (86400000 / 2)), transactionType:'MONEY_OUT',user:'Momo Account',type:'Refund'},
      {fromUser:'+27658016040',amount:4545,time:(Date.now() - 86400000 / 3), transactionType:'MONEY_IN',user:'Joseph NGA',type:'PAYMENTS'},
      {fromUser:'+27658016070',amount:8880,time:(Date.now() - (2 * 86400000)), transactionType:'MONEY_IN',user:'Lameck Ndhlovu',type:'PAYMENTS'},
    ]
  },
  {
    type:'MoMo Pay Account 2',
    accountId:2,
    balance:0,
    transactions:[]
  }
]

const initialState: { userAccounts: UserAccountType[]; transactions: transactionType[]; filters:TransactionFiltersType[] } = {
  userAccounts: userAccounts,
  transactions:[],
  filters:[{type:'dates',value:false},{type:'amounts',value:false},{type:'transactionType',value:false}]
};
export const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState,
  reducers: {
    setUserAccounts(state, action: PayloadAction<UserAccountType[]>) {
      state.userAccounts = action.payload;
    },
    setTransactions(state, action: PayloadAction<transactionType[]>) {
      state.transactions = action.payload;
    },
    setFilters(state, action: PayloadAction<TransactionFiltersType[]>) {
      state.filters = action.payload;
    }
  },
});

export const {setUserAccounts,setTransactions,setFilters} = transactionSlice.actions;

const persistConfig: PersistConfig<any> = {
  key: 'rtk:auth',
  storage: AsyncStorage,
  whitelist: ['accessToken'],
};

export const transactionReducer = persistReducer(persistConfig, transactionSlice.reducer);
