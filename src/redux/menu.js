import { createSlice } from "@reduxjs/toolkit"

export const MenuSlice = createSlice({
    name:"menu",
    initialState:{
        showMenu: false
    },
    reducers:{
        enableMenu: (state) => {
            state.showMenu = true
        },
        disableMenu: (state) => {
            state.showMenu = false
        }
    }
})

export const { enableMenu, disableMenu } = MenuSlice.actions
export default MenuSlice.reducer;