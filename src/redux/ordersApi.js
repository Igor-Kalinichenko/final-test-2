import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => `orders`,
            providesTags: (result) => ['Orders']
        }),
        addOrder: build.mutation({
            query: (body) => ({
                url: 'orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Orders']
        }),
        deleteOrder: build.mutation({
            query: (id) => ({
                url: `orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders']
        }),
    })
});

export const {useGetOrdersQuery, useAddOrderMutation, useDeleteOrderMutation} = ordersApi;