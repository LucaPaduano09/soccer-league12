import { configureStore } from "@reduxjs/toolkit";
import addModalReducer from "./modals.js";
import showMenuReducer from "./menu.js";
import adminLoggedReducer from "./adminLogged.js";
import sidebarReducer from "./sidebar.js";
import { playerSlice } from "./playerSlice.js";
import loaderSlice from "./loader.js"

export default configureStore({
  reducer: {
    addModal: addModalReducer,
    showMenu: showMenuReducer,
    adminLogged: adminLoggedReducer,
    sidebar: sidebarReducer,
    player: playerSlice,
    loader: loaderSlice,
  },
});
