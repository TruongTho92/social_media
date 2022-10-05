import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    authentication_token: "",
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
          toast(`${action.payload.message}`, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
          state.data = action.payload;
          toast(`${action.payload.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (state.data.is_success) {
            sessionStorage.setItem(
              "access_token",
              JSON.stringify(state.data.authentication_token)
            );

            document.cookie = JSON.stringify(state.data.authentication_token);
          }
        }
      )
      .addCase(loginUserAsync.rejected, (state, action: any) => {
        state.status = "failure";
        state.data = action.payload;
      });
  },
});

export const getRegisterMessage = (state: RootState) => state.auth.data.message;
export const getLoginData = (state: RootState) => state.auth.data;

export default AuthSlice.reducer;
