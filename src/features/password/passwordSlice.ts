import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchPasswordStrength } from "./passwordAPI";

export interface PasswordState {
  score: number;
  guessTimeSeconds?: number;
  guessTimeString?: string;
  warning?: string;
  suggestions?: string[];
}

const initialState: PasswordState = {
  score: -1,
  suggestions: [],
};

export const checkPasswordStrength = createAsyncThunk(
  "password/checkPasswordStrength",
  async (password: string) => {
    const response = await fetchPasswordStrength(password);
    return response.data;
  }
);

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.score = -1;
      state.guessTimeSeconds = undefined;
      state.guessTimeString = undefined;
      state.warning = undefined;
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkPasswordStrength.pending, (state) => {})
      .addCase(checkPasswordStrength.fulfilled, (state, action) => {
        const {
          score,
          guessTimeSeconds,
          guessTimeString,
          warning,
          suggestions,
        } = action.payload;
        state.score = score;
        state.guessTimeSeconds = guessTimeSeconds;
        state.guessTimeString = guessTimeString;
        state.warning = warning;
        state.suggestions = suggestions;
      });
  },
});

export const { cleanUp } = passwordSlice.actions;

export const selectPassword = (state: RootState) => state.password;

export default passwordSlice.reducer;
