import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import axios, {AxiosError} from 'axios';
// import store from '../../store/store';

const nodeAxiosInstance = axios.create({
  baseURL: 'http://3.7.4.177:3004/api',
  //   headers: {
  //     accept: `application/vnd.github.v3+json`,
  //   },
});
// nodeAxiosInstance.interceptors.request.use(
//   async req => {
//     const token = store.getState()?.user?.token;
//     if (!req.headers.Authorization) {
//       req.headers.common.Authorization = `Bearer ${token}`;
//     }
//     return req;
//   },
//   error => {
//     console.log('req error', error);
//     return Promise.reject(error);
//   },
// );

const axiosBaseQuery =
  (): BaseQueryFn<any> =>
  async (requestOpts, {getState}) => {
    try {
      // const token = (getState() as any).authSlice.accessToken;
      //   const token = (getState() as RootState).authSlice.accessToken;
      const result = await nodeAxiosInstance({
        ...requestOpts,
        // headers: {
        //   //   ...(omit(requestOpts.headers, ['user-agent'])),
        //   Authorization: `Bearer ${token}`,
        // },
      });

      return {data: result.data};
      //   return { data: wrapResponseWithLink(result.data, result.headers.link) };
    } catch (axiosError) {
      console.log('axiosError', {axiosError}, axiosError);
      const err = axiosError as AxiosError;
      return {error: {status: err.response?.status, data: err.response?.data}};
    }
  };

export const nodeApi = createApi({
  reducerPath: 'nodeApi', // optional
  //   baseQuery: fetchBaseQuery({baseUrl: 'https://nodenextgen.sandboxing.tech'}),
  baseQuery: axiosBaseQuery(),
  // tagTypes: ['Post', 'User'],
  endpoints: () => ({}),
});
