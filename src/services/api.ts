import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthResponse {
  data: {
    user: {
      email: string;
      name: string;
      password: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
  }
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, { name: string, email: string; password: string, role: string }>({
      query: (data) => ({
        url: 'signup',
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
    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useGetUserByIdQuery } = api;
