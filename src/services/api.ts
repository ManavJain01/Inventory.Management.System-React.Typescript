import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthResponse {
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      password: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

const accessToken = localStorage.getItem("accessToken") || "";
const refreshToken = localStorage.getItem("refreshToken") || "";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, { name: string, email: string; password: string, role: string }>({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'forgot-password',
        method: 'POST',
        body: data,
      })
    }),
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({id, ...data}) => ({
        url: `users/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useForgotPasswordMutation, useGetUserByIdQuery, useUpdateUserMutation } = api;
