import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';
import type {AxiosError, AxiosRequestConfig} from 'axios';
import axios from 'axios';
import {RootState} from '../../store/store';


const nodeAxiosInstance = axios.create({
  // baseURL: 'https://cmsnextgen.sandboxing.tech',
  baseURL: 'http://3.7.4.177:3004/api',
  headers: {
    // xsrfCookieName: 'XSRF-TOKEN-API',
    // xsrfHeaderName: 'X-XSRF-TOKEN-API',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
  },
  xsrfCookieName: 'XSRF-TOKEN-API',
  xsrfHeaderName: 'X-XSRF-TOKEN-API',
});

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown,
    Record<string, unknown>,
    Record<string, unknown>
  > =>
  async (requestOpts, {getState}) => {
    try {
      console.log('requestOpts', requestOpts);
      const token = (getState() as RootState).auth.accessToken;
      const result = await nodeAxiosInstance({
        ...requestOpts,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {data: result.data};
    } catch (axiosError) {
      console.log('axiosError', {axiosError}, axiosError);
      const err = axiosError as AxiosError;
      if (!axios.isAxiosError(err)) {
        return {
          error: err,
        };
      }
      return {error: {status: err.response?.status, data: err.response?.data}};
    }
  };

export const cmsApi = createApi({
  reducerPath: 'nodeApi', // optional
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});
