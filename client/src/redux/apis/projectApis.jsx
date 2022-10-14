import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectsApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/project", credentials: "include"}),
    endpoints: (builder)=>({
        getAllProjects: builder.query({
            query: ()=> "/all"
        }),
        getRecentProjects: builder.query({
            query: ()=> "/recent"
        }),
        getSingleProject: builder.query({
            query: (id)=> `/single/${id}`,
            credentials: "include"
        }),
        createProject: builder.mutation({
            query: ({title, webLink, github, img, tags}) =>({
                url: "/create",
                method: "POST",
                body: {title, webLink, github, img, tags},
                headers:{
                    'Content-type': 'application/json', 
                },
                credentials: "include"
            })
        }),
        updateProject : builder.mutation({
            query: ({id, publicId, img, title, webLink, github, tags})=>({
                url: `/update/${id}&${publicId}`,
                method: "PATCH",
                body: {img, title, webLink, github, tags},
                headers:{
                    'Content-type': 'application/json', 
                },
                credentials: "include"
            })
        }),
        deleteProject : builder.mutation({
            query: (id)=>({
                url: `/delete/${id}`,
                method: "DELETE",
                credentials: "include"
            })
        })
    })
});

export const {useGetAllProjectsQuery, useGetRecentProjectsQuery, useGetSingleProjectQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation} = projectsApi