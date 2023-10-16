import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import {PersistConfig} from 'redux-persist/lib/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthState } from './types';

// const initialState: AuthState = {};
type AuthState = {
  user: any;
  accessToken: any;
  refreshToken: any;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    updateToken(state, action: PayloadAction<any | undefined>) {
      console.log('action', action.payload)
      console.log('action', action.payload?.status)
      // const {accessToken, refreshToken} = action.payload;
      // console.log('accessToken', accessToken)
      state.refreshToken = action.payload?.refreshToken;
      state.accessToken = action.payload?.accessToken;
    },
    logOut: state => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const {updateToken, logOut} = authSlice.actions;

const persistConfig: PersistConfig<any> = {
  key: 'rtk:auth',
  storage: AsyncStorage,
  whitelist: ['accessToken'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
