import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { logoutUser, resetTokens, setTokens } from "../store/reducers/authReducer";

interface UserResponse {
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

interface ProductResponse {
  data: {
    data: {
      _id: string;
      name: string;
      price: number;
      quantity: number;
      lowStockThreshold: number;
      warehouse_id: string;
    };
  }
}

interface WarehouseResponse {
  data: {
    data: {
      _id: string;
      name: string;
      location: string;
      managerId: string;
    };
  }
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const state = getState() as RootState;

    const token = state.auth.accessToken; // Get accessToken from your Redux state
    
    // List of public endpoints where no token is required
    const publicEndpoints = ['signup', 'login', 'forgotPassword', 'reset-password' ]; // Add other public endpoints here
    if (!publicEndpoints.includes(endpoint) && token) {
      // Attach the token only for private endpoints
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Access token expired, attempt to refresh
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      // Attempt token refresh
      const refreshResult = await baseQuery(
        {
          url: "refresh-token",
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`, // Send the refresh token as Bearer
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Save new tokens in Redux state
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        api.dispatch(
          setTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, log the user out
        api.dispatch(resetTokens());
        api.dispatch(logoutUser());
      }
    } else {
      // No refresh token available, log the user out
      api.dispatch(resetTokens());
      api.dispatch(logoutUser());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Auth APIs
    signUp: builder.mutation<UserResponse, { name: string, email: string; password: string, role: string }>({
      query: (data) => ({
        url: 'signup',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<UserResponse, { email: string; password: string }>({
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
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'reset-password',
        method: 'POST',
        body: data
      })
    }),
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
    }),
    // Products APIs
    showProducts: builder.mutation({
      query: () => ({
        url: `inventory/`,
        method: 'GET',
      }),
    }),
    createProduct: builder.mutation<ProductResponse, [{ name: string, price: number, quantity: number, lowStockThreshold: number, warehouse_id: string }]>({
      query: (data) => ({
        url: 'inventory',
        method: 'POST',
        body: data,
      }),
    }),
    getProductById: builder.mutation<ProductResponse, { name: string, price: number, quantity: number, lowStockThreshold: number, warehouse_id: string }>({
      query: (id) => ({
        url: `inventory/${id}`,
        method: 'GET',
      }),
    }),
    updateProduct: builder.mutation({
      query: ({id, ...data}) => ({
        url: `inventory/${id}`,
        method: 'PATCH',
        body: data
      }),
    }),
    editProduct: builder.mutation({
      query: ({id, ...data}) => ({
        url: `inventory/${id}`,
        method: 'PUT',
        body: data
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({id, ...data}) => ({
        url: `inventory/${id}`,
        method: 'DELETE',
        body: data
      }),
    }),
    // Warehouse APIs
    showWarehouses: builder.mutation({
      query: () => ({
        url: `warehouse/`,
        method: 'GET',
      }),
    }),
    createWarehouse: builder.mutation<WarehouseResponse, [{ name: string, location: string; managerId: string }]>({
      query: (data) => ({
        url: 'warehouse',
        method: 'POST',
        body: data,
      }),
    }),
    getWarehouseById: builder.mutation<User, string>({
      query: (id) => ({
        url: `warehouse/${id}`,
        method: 'GET',
      }),
    }),
    updateWarehouse: builder.mutation({
      query: ({id, ...data}) => ({
        url: `warehouse/${id}`,
        method: 'PATCH',
        body: data
      }),
    }),
    editWarehouse: builder.mutation({
      query: ({id, ...data}) => ({
        url: `warehouse/${id}`,
        method: 'PUT',
        body: data
      }),
    }),
    deleteWarehouse: builder.mutation({
      query: ({id, ...data}) => ({
        url: `warehouse/${id}`,
        method: 'DELETE',
        body: data
      }),
    }),
  }),
});

export const { 
  // Auth
  useSignUpMutation, useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation,
  // Users
  useShowUsersMutation, useCreateUserMutation, useGetUserByIdMutation, useEditUserMutation, useUpdateUserMutation, useDeleteUserMutation,
  // Products
  useShowProductsMutation, useCreateProductMutation, useGetProductByIdMutation, useEditProductMutation, useUpdateProductMutation, useDeleteProductMutation,
  // Warehouses
  useShowWarehousesMutation, useCreateWarehouseMutation, useGetWarehouseByIdMutation, useEditWarehouseMutation, useUpdateWarehouseMutation, useDeleteWarehouseMutation
 } = api;
