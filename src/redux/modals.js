import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "addModal",
  initialState: {
    adminFotoModal: false,
    leagueModal: false,
    deleteTeamModal: false,
    modifyTeamModal: false,
  },
  reducers: {
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
    },
    openDeleteTeamModal: (state) => {
      state.deleteTeamModal = true;
    },
    closeDeleteTeamModal: (state) => {
      state.deleteTeamModal = false;
    },
    openModifyTeamModal: (state) => {
      state.modifyTeamModal = true;
    },
    closeModifyTeamModal: (state) => {
      state.modifyTeamModal = false;
    },
  },
});

export const {
  openAdminFotoModal,
  closeAdminFotoModal,
  openLeagueModal,
  closeLeagueModal,
  openDeleteTeamModal,
  closeDeleteTeamModal,
  openModifyTeamModal,
  closeModifyTeamModal
} = ModalSlice.actions;
export default ModalSlice.reducer;
