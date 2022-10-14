import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/user", credentials:"include"}),
    endpoints: (builder) =>({
        getAdmin : builder.query({
            query: ()=> "/admin",
            credentials: "include"
        }),
        loginUser: builder.mutation({
            query: (admin)=>({
                method: "POST",
                body: {email: admin.email, password: admin.password},
                url: "/login",
                headers:{
                    'Content-type': 'application/json',                   
                },
            })
           
        })
    })
});

export const { useGetAdminQuery , useLoginUserMutation} = authApi