import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/user", credentials: "include"}),
    endpoints:(builder)=>({
        getCurrentUser: builder.query({
            query: ()=> "/single"
        }),
        contactUser: builder.mutation({
            query: ({name, email,message})=> ({
                url: "/contact",
                method: "POST",
                headers: {
                    'Content-type': 'application/json',  
                },
                body: {name, email, message}
            })
        }),
        updateUser: builder.mutation({
            query: ({name,email, password, role,description,subtitle,phone,quote, avatar,skills, skillId}) =>({
                url: "/update",
                method: "PATCH",
                body: {name, email,password,role,description,subtitle,phone,quote,avatar,skills, skillId},
                headers:{
                    'Content-type': 'application/json',                   
                },
                credentials: "include"
            })
        }),
        addTimeline: builder.mutation({
            query: ({title, desc, date}) =>({
                url: "/timeline",
                method: "PATCH",
                body: {title, desc, date},
                headers:{
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
        }),
        deleteTimeline: builder.mutation({
            query: (id) =>({
              url: `/timeline/delete/${id}`,
              method: "PATCH",
              credentials: "include"
            })
        })
    })
});

export const {useGetCurrentUserQuery, useUpdateUserMutation, useAddTimelineMutation, useDeleteTimelineMutation, useContactUserMutation} = userApi