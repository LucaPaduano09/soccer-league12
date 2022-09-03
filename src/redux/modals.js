import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "addModal",
  initialState: {
    adminFotoModal: false,
    leagueModal: false,
    addTeamModal: false,
    deleteTeamModal: false,
    modifyTeamModal: false,
    changeMatchStatusModal: false,
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
    openAddTeamModal: (state) => {
      state.addTeamModal = true;
    },
    closeAddTeamModal: (state) => {
      state.addTeamModal = false;
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
    openChangeMatchStatusModal: (state) => {
      state.changeMatchStatusModal = true;
    },
    closeChangeMatchStatusModal: (state) => {
      state.changeMatchStatusModal = false;
    }
  },
});

export const {
  openAdminFotoModal,
  closeAdminFotoModal,
  openLeagueModal,
  closeLeagueModal,
  openAddTeamModal,
  closeAddTeamModal,
  openDeleteTeamModal,
  closeDeleteTeamModal,
  openModifyTeamModal,
  closeModifyTeamModal,
  openChangeMatchStatusModal,
  closeChangeMatchStatusModal
} = ModalSlice.actions;
export default ModalSlice.reducer;
