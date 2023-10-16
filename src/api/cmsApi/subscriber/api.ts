import decrypt from '@/utils/encryption/decrypt';
import {cmsApi} from '../axios';

export const subscribeApi = cmsApi.injectEndpoints({
  endpoints: builder => ({
    initiatse: builder.mutation<any, any>({
      query: body => ({
        url: '/subscriber/initiate',
        // responseHandler: response => response.text(),
        method: 'POST',
        data: body,
      }),
      transformResponse: responseData => {
        console.log('responseData', responseData);
        return decrypt(responseData);
      },
    }),
  }),
});

export const {useInitiatseMutation} = subscribeApi;
