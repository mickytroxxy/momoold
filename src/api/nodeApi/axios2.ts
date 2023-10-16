import decrypt from '@/utils/encryption/decrypt'
import encrypt from '@/utils/encryption/encrypt'
import { createApi } from '@reduxjs/toolkit/query'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

type BaseQueryFnType = {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
}


type axiosRequestOptions = {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
}


const baseUrl = 'http://3.7.4.177:3003/api'
// const baseUrl = 'http://10.0.2.2:3000/api'
const commonHeaders = { "Content-Type": "application/json", "subscriberid": "testingsubscriberid" }


const nodeAxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        accept: `application/json`,
        ...commonHeaders
    },
})


nodeAxiosInstance.interceptors.request.use(async request => {

    // Modify the request by encrypting data here
    const encryptedData = await encrypt(request.data)
    console.log('encryptedData', encryptedData)
    request.data = { payload: encryptedData }
    console.log(`RequestData === `, request.data)
    return request
})

nodeAxiosInstance.interceptors.response.use(async response => {

    // Modify the normal response by decrypting data here
    const decryptedData = await decrypt(response.data)
    console.log('decryptedData', decryptedData)
    response.data = { payload: decryptedData }
    console.log(`ResponseData === `, response.data)
    return response
}, async err => {
    // Modify the error response by decrypting data here
    const decryptedErrData = await decrypt(err.response?.data || err.message)
    console.log('decryptedErrData', decryptedErrData)
    err.response.data = decryptedErrData
    console.log(`ResponseErrData === `, err.response?.data)
    return Promise.reject(err)
})


const axiosBaseQuery = (): BaseQueryFn<BaseQueryFnType, unknown,
    unknown> => (
    async (requestoptions: axiosRequestOptions) => {
        try {
            const result: AxiosResponse = await nodeAxiosInstance({ ...requestoptions })
            // Modify the response by decrypting data here
            return {
                data: {
                    data: result.data,
                    statusCode: result.statusText
                }
            }
        } catch (axiosError) {
            let err = axiosError as AxiosError
            return {
                error: {
                    data: err.response?.data || err.message,
                    statusCode: err.response?.status,
                },
            }
        }
    }
)


const nodeAxiosApi = createApi({
    reducerPath: 'testaxiosapi',
    baseQuery: axiosBaseQuery(),
    endpoints(builder) {
        return {
            login: builder.mutation({
                query: (body) => ({ url: '/auth/login', method: 'Post', data: body }),
                transformResponse: async (response: AxiosResponse) => {
                    console.log(`responseData == `, response)
                    return response
                },
                transformErrorResponse: (errResponse: AxiosError) => {
                    console.log(`errorResponseData == `, errResponse)
                    return errResponse
                },
            }),
            getUsers: builder.query({
                query: () => ({ url: '/users/getUsers', method: 'get' }),
                transformResponse: (response: AxiosResponse) => {
                    console.log(`responseData == `, response.data)
                    return response
                },
                transformErrorResponse: (errResponse: AxiosError) => {
                    console.log(`errorResponseData == `, errResponse)
                    return errResponse
                },
            }),
        }
    },
})

export default nodeAxiosApi 