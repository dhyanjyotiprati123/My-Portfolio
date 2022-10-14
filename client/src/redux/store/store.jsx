import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import adminReducer from "../slices/adminSlice";
import {userApi} from "../apis/userApis";
import { authApi } from "../apis/authApis";
import { projectsApi } from "../apis/projectApis";

const store = configureStore({
    reducer:{
       user: userReducer,
       admin: adminReducer,
       [userApi.reducerPath]: userApi.reducer,
       [authApi.reducerPath]: authApi.reducer,
       [projectsApi.reducerPath]: projectsApi.reducer,
    }
});

export default store;