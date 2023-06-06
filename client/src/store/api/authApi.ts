import { signnupUser } from './../../../../src/controllers/userControllers';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000' }),
  endpoints: (builder) => ({
    signinUser: builder.mutation({
      query: (body:{email:string,password:string})=>{
        return {
          url: '/signin',
          method: "post",
          body
        }
      }
    }),
    signupUser: builder.mutation({
      query: (body:{name:string,email:string,password:string})=>{
        return {
          url: '/signup',
          method: 'post',
          body
        }
      }
    }),
    sendMailFOrVerification: builder.mutation({
      query: (body:{email:string})=>{
        return {
          url: '/sendVerificationMail',
          method: 'post',
          body
        }
      }
    }),
    verifyUser: builder.mutation({
      query: (body:{token:string})=>{
        return {
          url: '/verifyUserMail',
          method: 'post',
          body
        }
      }
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSigninUserMutation,useSignupUserMutation,useSendMailFOrVerificationMutation,useVerifyUserMutation } = authApi