import { createSlice } from "@reduxjs/toolkit"

export const ModalSlice = createSlice({
    name: "addModal",
    initialState:{
        adminFotoModal: false,
        leagueModal: false,
    },
    reducers:{
        openAdminFotoModal: (state) => {
            state.adminFotoModal = true;
        },
        closeAdminFotoModal: (state) => {
            state.adminFotoModal = false;
        },
        openLeagueModal: (state) => {
            state.leagueModal = true;
        },
        closeLeagueModal: (state) => {
            state.leagueModal = false;
        }
    }
})

export const { openAdminFotoModal, closeAdminFotoModal, openLeagueModal, closeLeagueModal } = ModalSlice.actions
export default ModalSlice.reducer;