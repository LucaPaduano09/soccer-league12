import { createSlice } from "@reduxjs/toolkit";

export const adminLoggedSlice = createSlice({
    name: "adminLogged",
    initialState:{
        logged: false,
    },
    reducers:{
        login: (state) => {
            state.logged = true
        },
        logout: (state) => {
            state.logged = false
        }
    }
})

export const { login, logout} = adminLoggedSlice.actions
export default adminLoggedSlice.reducer;