import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { userRegistered, UserRegisterTypes } from "~/common/types";
import { registerUser } from "./registerApi";

export interface stateType {
  status: "idle" | "loading" | "success" | "failure";
  user: userRegistered;
}

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (payload: UserRegisterTypes) => {
    const response = await registerUser(payload);
    return response;
  }
);

const initialState: stateType = {
  status: "idle",
  user: {
    user: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    message: "",
  },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerUserAsync.fulfilled,
        (state, action: PayloadAction<userRegistered>) => {
          state.status = "success";
          state.user = action.payload;
        }
      )
      .addCase(registerUserAsync.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const getUserRegister = (state: RootState) =>
  state.register.user.message;

export default registerSlice.reducer;
