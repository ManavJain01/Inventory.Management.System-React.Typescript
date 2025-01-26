import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, ProductResponse } from './api';

export const apiProduct = createApi({
  reducerPath: "apiProduct",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
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
      query: (id) => ({
        url: `inventory/${id}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const { 
  // Products
  useShowProductsMutation, useCreateProductMutation, useGetProductByIdMutation, useEditProductMutation, useUpdateProductMutation, useDeleteProductMutation,
 } = apiProduct;
