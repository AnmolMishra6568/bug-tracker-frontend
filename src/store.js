import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import ticketsReducer from "./features/ticketsSlice.js";
import projectsReducer from "./features/projectsSlice.js";
import usersReducer from "./features/usersSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
    projects: projectsReducer,
    users: usersReducer
  }
});
