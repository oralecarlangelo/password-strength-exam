import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import passwordReducer from "../features/password/passwordSlice";

export const store = configureStore({
  reducer: {
    password: passwordReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
