import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "addModal",
  initialState: {
    adminFotoModal: false,
    leagueModal: false,
    addTeamModal: false,
    deleteTeamModal: false,
    updateTeamNameModal: false,
    updateTeamPointsModal: false,
    updateTeamLogoModal: false,
    changeMatchStatusModal: false,
    addPlayerModal: false,
    deletePlayerModal: false,
    updatePlayerNameModal: false,
    updatePlayerLastNameModal: false,
    updatePlayerGoalModal: false,
    updatePlayerLogoModal: false,
    addDayModal: false,
    addGameModal: false,
    addGameToDayModal: false,
    removeGameFromDayModal: false,
    updateResultModal: false,
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
    openUpdateTeamNameModal: (state) => {
      state.updateTeamNameModal = true;
    },
    closeUpdateTeamNameModal: (state) => {
      state.updateTeamNameModal = false;
    },
    openUpdateTeamPointsModal: (state) => {
      state.updateTeamPointsModal = true
    },
    closeUpdateTeamPointsModal: (state) => {
      state.updateTeamPointsModal = false
    },
    openUpdateTeamLogoModal: (state) => {
      state.updateTeamLogoModal = true
    },
    closeUpdateTeamLogoModal: (state) => {
      state.updateTeamLogoModal = false
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
      state.deletePlayerModal = false;
    },
    openUpdatePlayerNameModal: (state) => {
      state.updatePlayerNameModal = true;
    },
    closeUpdatePlayerNameModal: (state) => {
      state.updatePlayerNameModal = false
    },
    openUpdatePlayerGoalModal: (state) => {
      state.updatePlayerGoalModal = true
    },
    closeUpdatePlayerGoalModal: (state) => {
      state.updatePlayerGoalModal = false
    },
    openUpdatePlayerLogoModal: (state) => {
      state.updatePlayerLogoModal = true
    },
    closeUpdatePlayerLogoModal: (state) => {
      state.updatePlayerLogoModal = false
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
    },
    openUpdateResultModal: (state) => {
      state.updateResultModal = true;
    },
    closeUpdateResultModal: (state) => {
      state.updateResultModal = false;
    },
    openUpdatePlayerLastNameModal: (state) => {
      state.updatePlayerLastNameModal = true;
    },
    closeUpdatePlayerLastNameModal: (state) => {
      state.updatePlayerLastNameModal = false;
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
  openUpdateTeamNameModal,
  closeUpdateTeamNameModal,
  openUpdateTeamPointsModal,
  closeUpdateTeamPointsModal,
  openUpdateTeamLogoModal,
  closeUpdateTeamLogoModal,
  openChangeMatchStatusModal,
  closeChangeMatchStatusModal,
  openAddPlayerModal,
  closeAddPlayerModal,
  openDeletePlayerModal,
  closeDeletePlayerModal,
  closeUpdatePlayerModal,
  openAddDayModal,
  closeAddDayModal,
  openAddGameModal,
  closeAddGameModal,
  openAddGameToDayModal,
  closeAddGameToDayModal,
  openRemoveGameFromDayModal,
  closeRemoveGameFromDayModal,
  openUpdateResultModal,
  closeUpdateResultModal,
  openUpdatePlayerNameModal,
  closeUpdatePlayerNameModal,
  openUpdatePlayerLastNameModal,
  closeUpdatePlayerLastNameModal,
  openUpdatePlayerGoalModal,
  closeUpdatePlayerGoalModal,
  openUpdatePlayerLogoModal,
  closeUpdatePlayerLogoModal
} = ModalSlice.actions;
export default ModalSlice.reducer;
