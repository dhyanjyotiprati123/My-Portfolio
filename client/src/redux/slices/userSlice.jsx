import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    user: null,
    error: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isLoggedin_success: (state, action)=>{
            state.loading = false
            state.user = action.payload
            state.error = null
            return state
        },
        isLoggedin_failure : (state, action)=>{
            state.loading = false
            state.user = null
            state.error = action.payload;
            return state
        }
    }
})

export const {isLoggedin_success, isLoggedin_failure} = userSlice.actions;

export default userSlice.reducer;