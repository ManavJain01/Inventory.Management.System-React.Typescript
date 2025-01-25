import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, UserResponse } from './api';

export const apiUser = createApi({
  reducerPath: "apiUser",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Users APIs
    showUsers: builder.mutation({
      query: () => ({
        url: `users/`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<UserResponse, { name: string, email: string; password: string, role: string }>({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        body: data,
      }),
    }),
    getUserById: builder.mutation<User, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: ({id, ...data}) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: data
      }),
    }),
    editUser: builder.mutation({
      query: ({id, ...data}) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: data
      }),
    }),
    deleteUser: builder.mutation({
      query: ({id, ...data}) => ({
        url: `users/${id}`,
        method: 'DELETE',
        body: data
      }),
    })
  }),
});

export const { 
  // Users
  useShowUsersMutation, useCreateUserMutation, useGetUserByIdMutation, useEditUserMutation, useUpdateUserMutation, useDeleteUserMutation,
 } = apiUser;
