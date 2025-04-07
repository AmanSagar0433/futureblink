import { combineReducers, Action } from "redux";
import loadingIndicatorSlice from "./slice/loadingIndicatorSilce";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";

const appReducer = combineReducers({
  loadingIndicator: loadingIndicatorSlice,
  userSlice: userSlice,
});

const appReducerTyped = appReducer as (
  state: RootState | undefined,
  action: Action<any>
) => RootState;

export const rootReducer = (
  state: RootState | undefined,
  action: Action<any>
) => {
  if (action.type === "reset") {
    state = undefined;
  }
  return appReducerTyped(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
