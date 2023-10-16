import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from '../features/auth/authSlice';
import {nodeApi} from '../api/nodeApi';
import {apiSlice} from '../api/cmsApi';
import {alertReducer} from '@/features/alert/alertSlice';
import nodeAxiosApi from '@/api/nodeApi/axios2';
import { transactionReducer } from '@/features/transactions/transactionSlice';
export const rootReducer = combineReducers({
  api: apiSlice.reducer,
  nodeApi: nodeApi.reducer,
  auth: authReducer,
  alert: alertReducer,
  transactionReducer,
  axiosReducer: nodeAxiosApi.reducer
});

export type AppstateType = ReturnType<typeof rootReducer>;
