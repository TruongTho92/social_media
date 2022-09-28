import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserLoginTypes } from "~/common/types";
import { loginUser } from "./loginApi";

export interface stateTypes {
  status: "idle" | "loading" | "success" | "failure";
  user: UserLoginTypes;
}

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (payload: UserLoginTypes) => {
    const res = await loginUser(payload);
    return res.data;
  }
);

const initialState: stateTypes = {
  status: "idle",
  user: { email: "", password: "" },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<UserLoginTypes>) => {
          state.status = "success";
          state.user = action.payload;
        }
      )
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export default loginSlice.reducer;
