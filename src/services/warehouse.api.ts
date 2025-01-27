import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, WarehouseResponse } from "./api";

export const apiWarehouse = createApi({
  reducerPath: "apiWarehouse",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Warehouse APIs
    showWarehouses: builder.mutation({
      query: () => ({
        url: `warehouse/`,
        method: 'GET',
      }),
    }),
    createWarehouse: builder.mutation({
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
        method: 'PUT',
        body: data
      }),
    }),
    editWarehouse: builder.mutation({
      query: ({id, ...data}) => ({
        url: `warehouse/${id}`,
        method: 'PATCH',
        body: data
      }),
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `warehouse/${id}`,
        method: 'DELETE'
      }),
    }),
    showProductsByWarehouseId: builder.mutation({
      query: (id) => ({
        url: `warehouse/allProducts/${id}`,
        method: 'GET'
      }),
    }),
  }),
});

export const { 
  // Warehouses
  useShowWarehousesMutation, useCreateWarehouseMutation, useGetWarehouseByIdMutation, useEditWarehouseMutation, useUpdateWarehouseMutation, useDeleteWarehouseMutation,
  useShowProductsByWarehouseIdMutation,
 } = apiWarehouse;
