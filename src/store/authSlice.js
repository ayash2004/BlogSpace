import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    // status: null,
    status: false,
    userData: null,
})
// Error 

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login : (state, action) => {
            state.status = true;    
            state.userData = action.payload.userData || action.payload;
        },
        // action.payload.userData  (Had Error in this)
        logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer;