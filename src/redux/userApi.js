import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `users`,
            providesTags: (result) => ['Users']
        }),
        addUser: build.mutation({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users']
        }),
        getUser: build.query({
            query: (id) => `users/${id}`,
            invalidatesTags: ['Users']
        }),
        editUser: build.mutation({
            query: ({id, ...body}) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const {useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useEditUserMutation, useGetUserQuery} = userApi;