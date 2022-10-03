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
    updateTeamGoalSubitiModal: false,
    updateTeamVittorieModal: false,
    updateTeamSconfitteModal: false,
    updateTeamPareggiModal: false,
    changeGironeModal: false,
    changeMatchStatusModal: false,
    addPlayerModal: false,
    deletePlayerModal: false,
    updatePlayerNameModal: false,
    updatePlayerLastNameModal: false,
    updatePlayerGoalModal: false,
    updatePlayerLogoModal: false,
    addDayModal: false,
    removeDayModal: false,
    addGameModal: false,
    addGameToDayModal: false,
    removeGameFromDayModal: false,
    updateGameStatusModal: false,
    updateResultModal: false,
    updateDateModal: false,
    updateTimeModal: false,
    updateScorerModal: false,
    addFotoModal: false,
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
    openUpdateTeamGoalSubitiModal : (state) => {
      state.updateTeamGoalSubitiModal = true;
    },
    closeUpdateTeamGoalSubitiModal: (state) => {
      state.updateTeamGoalSubitiModal = false;
    },
    openUpdateTeamVittorieModal: (state) => {
      state.updateTeamVittorieModal = true;
    },
    closeUpdateTeamVittorieModal: (state) => {
      state.updateTeamVittorieModal = false;
    },
    openUpdateTeamSconfitteModal: (state) => {
      state.updateTeamSconfitteModal = true;
    },
    closeUpdateTeamSconfitteModal: (state) => {
      state.updateTeamSconfitteModal = false;
    },
    openUpdateTeamPareggiModal: (state) => {
      state.updateTeamPareggiModal = true;
    },
    closeUpdateTeamPareggiModal: (state) => {
      state.updateTeamPareggiModal =false;
    },
    openChangeMatchStatusModal: (state) => {
      state.changeMatchStatusModal = true;
    },
    closeChangeMatchStatusModal: (state) => {
      state.changeMatchStatusModal = false;
    },
    openChangeGironeModal: (state) => {
      state.changeGironeModal = true;
    },
    closeChangeGironeModal: (state)  => {
      state.changeGironeModal = false;
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
    openUpdatePlayerLastNameModal: (state) => {
      state.updatePlayerLastNameModal = true;
    },
    closeUpdatePlayerLastNameModal: (state) => {
      state.updatePlayerLastNameModal = false;
    },
    openAddDayModal: (state) => {
      state.addDayModal = true;
    },
    closeAddDayModal: (state) => {
      state.addDayModal = false;
    },
    openRemoveDayModal: (state) => {
      state.removeDayModal = true;
    },
    closeRemoveDayModal: (state) => {
      state.removeDayModal = false;
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
    openUpdateDateModal: (state) => {
      state.updateDateModal = true;
    },
    closeUpdateDateModal: (state) => {
      state.updateDateModal = false;
    },
    openUpdateTimeModal: (state) => {
      state.updateTimeModal = true;
    },
    closeUpdateTimeModal: (state) => {
      state.updateTimeModal = false;
    },
    openUpdateScorerModal: (state) => {
      state.updateScorerModal = true;
    },
    closeUpdateScorerModal: (state) => {
      state.updateScorerModal = false;
    },
    openAddFotoModal: (state) => {
      state.addFotoModal = true;
    },
    closeAddFotoModal: (state) => {
      state.addFotoModal = false;
    },
    openUpdateGameStatusModal: (state) => {
      state.updateGameStatusModal = true;
    },
    closeUpdateGameStatusModal: (state) => {
      state.updateGameStatusModal = false;
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
  openUpdateTeamGoalSubitiModal,
  closeUpdateTeamGoalSubitiModal,
  openUpdateTeamPareggiModal,
  closeUpdateTeamPareggiModal,
  openUpdateTeamSconfitteModal,
  closeUpdateTeamSconfitteModal,
  openUpdateTeamVittorieModal,
  closeUpdateTeamVittorieModal,
  openChangeGironeModal,
  closeChangeGironeModal,
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
  closeUpdatePlayerLogoModal,
  openUpdateDateModal,
  closeUpdateDateModal,
  openUpdateTimeModal,
  closeUpdateTimeModal,
  openUpdateScorerModal,
  closeUpdateScorerModal,
  openAddFotoModal,
  closeAddFotoModal,
  openUpdateGameStatusModal,
  closeUpdateGameStatusModal,
  openRemoveDayModal,
  closeRemoveDayModal,
} = ModalSlice.actions;
export default ModalSlice.reducer;
