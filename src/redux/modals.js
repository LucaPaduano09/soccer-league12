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
    addPlayerModal: false,
    deletePlayerModal: false,
    updatePlayerModal: false,
    addDayModal: false,
    addGameModal: false,
    addGameToDayModal: false,
    removeGameFromDayModal: false,
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
    },
    openAddPlayerModal: (state) => {
      state.addPlayerModal = true;
    },
    closeAddPlayerModal: (state) => {
      state.addPlayerModal = false;
    },
    openDeletePlayerModal: (state) => {
      state.deletePlayerModal = true;
    },
    closeDeletePlayerModal: (state) => {
      state.deletePlayerModal = false
    },
    openUpdatePlayerModal: (state) => {
      state.updatePlayerModal = true;
    },
    closeUpdatePlayerModal: (state) => {
      state.updatePlayerModal = false;
    },
    openAddDayModal: (state) => {
      state.addDayModal = true;
    },
    closeAddDayModal: (state) => {
      state.addDayModal = false;
    },
    openAddGameModal: (state) => {
      state.addGameModal = true;
    },
    closeAddGameModal: (state) => {
      state.addGameModal = false;
    },
    openAddGameToDayModal: (state) => {
      state.addGameToDayModal = true;
    },
    closeAddGameToDayModal: (state) => {
      state.addGameToDayModal = false;
    },
    openRemoveGameFromDayModal: (state) => {
      state.removeGameFromDayModal = true;
    },
    closeRemoveGameFromDayModal: (state) => {
      state.removeGameFromDayModal = false;
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
  closeChangeMatchStatusModal,
  openAddPlayerModal,
  closeAddPlayerModal,
  openDeletePlayerModal,
  closeDeletePlayerModal,
  openUpdatePlayerModal,
  closeUpdatePlayerModal,
  openAddDayModal,
  closeAddDayModal,
  openAddGameModal,
  closeAddGameModal,
  openAddGameToDayModal,
  closeAddGameToDayModal,
  openRemoveGameFromDayModal,
  closeRemoveGameFromDayModal,
} = ModalSlice.actions;
export default ModalSlice.reducer;
