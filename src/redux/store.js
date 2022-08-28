import { configureStore } from '@reduxjs/toolkit'
import addModalReducer from "./modals.js"
import showMenuReducer from "./menu.js"

export default configureStore({
   reducer:{
   addModal: addModalReducer,
   showMenu:  showMenuReducer,
 }	
})