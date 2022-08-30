import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebarState",
    initialState: {
        dashboard: true,
        competitions: false,
        teams: false,
        players: false
    },
    reducers: {
        toggleDashboard : (state, action) => {
            state.dashboard = action.payload
        },
        toggleCompetitions : (state, action) => {
            state.competitions = action.payload
        },
        toggleTeams : (state, action) => {
            state.teams = action.payload
        },
        togglePlayers : (state, action) => {
            state.players = action.payload
        },
        reset: (state) => {
            state.dashboard = true
            state.competitions = false
            state.teams = false
            state.players = false
        }
    }
})

export const { toggleDashboard, toggleCompetitions, togglePlayers, toggleTeams, reset  } = sidebarSlice.actions
export default sidebarSlice.reducer;