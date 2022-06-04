import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth-silce";
import goalReducer from "../features/goals/goal-slice";
import modalReducer from "../features/modal/modal-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
    modal: modalReducer,
  },
});
