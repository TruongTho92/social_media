import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { UserDataResponse, UserDataTypes } from "~/common/types";
import { loginUser, registerUser } from "./AuthApi";

export interface stateType {
  status: "idle" | "loading" | "success" | "failure";
  data: UserDataResponse;
}

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (payload: UserDataTypes) => {
    const response = await registerUser(payload);
    return response;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (payload: UserDataTypes) => {
    const response = await loginUser(payload);
    return response;
  }
);

const initialState: stateType = {
  status: "idle",
  data: {
    user: {
      email: "",
      password: "",
      password_confirmation: "",
      authentication_token: "",
    },
    message: "",
    is_success: false,
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerUserAsync.fulfilled,
        (state, action: PayloadAction<UserDataResponse>) => {
          state.status = "success";
          state.data.message = action.payload.message;
          // state.data = action.payload;
        }
      )
      .addCase(registerUserAsync.rejected, (state) => {
        state.status = "failure";
      });

    // LOGIN
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<UserDataResponse>) => {
          state.status = "success";
          state.data.message = action.payload.message;
          state.data.is_success = action.payload.is_success;
          state.data = action.payload;
        }
      )
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const getRegisterMessage = (state: RootState) => state.auth.data.message;
export const getLoginMessage = (state: RootState) => state.auth.data.message;
export const getLoginSuccess = (state: RootState) => state.auth.data.is_success;

export default AuthSlice.reducer;
