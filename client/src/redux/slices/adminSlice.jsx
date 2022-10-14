import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin: null
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        isAdminLoggedIn: (state, action)=>{
            state.admin = action.payload;
            return state
        },
        isAdminLoggedOut: (state, action)=>{
            state.admin = action.payload
            return state
        }
    }
});

export const {isAdminLoggedIn, isAdminLoggedOut, getAdmin} = adminSlice.actions;

export default adminSlice.reducer;