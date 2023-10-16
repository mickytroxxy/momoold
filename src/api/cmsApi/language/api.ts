import encrypt from '@/utils/encryption/encrypt';
import {apiSlice} from '../index';
import decrypt from '@/utils/encryption/decrypt';

export const sessionApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<any, any>({
      query: (body) => ({
        url: '/users/getUsers',
        // headers: {
        //   'Content-Type': 'application/xml; charset:utf-8',
        // },
        // params: encrypt(body)
        body: encrypt(body),
      }),
      transformResponse: responseData => {
        console.log('responseData', responseData);
        return decrypt(responseData);
      },
    }),
    login: builder.mutation<any, any>({
      query: body => ({
        url: '/auth/login',
        responseHandler: response => response.text(),
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: body,
      }),
      transformResponse: responseData => {
        console.log('responseData', responseData);
        return decrypt(responseData);
      },
    }),
  }),
});

export const {useGetUserQuery, useLoginMutation} = sessionApi;
