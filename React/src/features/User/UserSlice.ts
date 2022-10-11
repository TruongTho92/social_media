import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "~/app/store";
import { UserDataResponse } from "~/common/types";

export interface stateType {
  loading?: boolean;
  status?: "idle" | "loading" | "success" | "failure";
  data: UserDataResponse;
  isAuthenticated?: boolean;
}

const initialState: stateType = {
  status: "idle",
  loading: false,
  data: {
    data: {
      user: {
        email: "",
        password: "",
        password_confirmation: "",
        authentication_token: "",
      },
    },
    message: "",
    is_success: false,
  },
  isAuthenticated: false,
};

const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RegisterRequest: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action: PayloadAction<UserDataResponse>) => {
      state.loading = false;
      state.data = action.payload;
      toast(`${action.payload.message}`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    RegisterFailure: (state) => {
      state.loading = true;
    },

    // LOGIN
    LoginRequest: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action: PayloadAction<UserDataResponse>) => {
      state.loading = false;
      state.data = action.payload;
      state.isAuthenticated = true;
      toast(`${action.payload.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    LoginFailure: (state, action: any) => {
      state.loading = true;
      state.data = action.payload;
      state.isAuthenticated = false;
      toast(`${action.payload.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },

    // LOAD USER
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action: PayloadAction<UserDataResponse>) => {
      state.loading = false;
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action: any) => {
      state.loading = true;
      state.data = action.payload;
      state.isAuthenticated = false;
    },

    // LOAD USER
    LogoutRequest: (state) => {
      state.loading = false;
    },
    LogoutSuccess: (state, action: PayloadAction<UserDataResponse>) => {
      state.data = action.payload;
      state.isAuthenticated = false;
    },
    LogoutFailure: (state, action: any) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
  },
});

// ACTIONS
export const { RegisterSuccess, RegisterRequest, RegisterFailure } =
  UserSlice.actions;
export const { LoginSuccess, LoginRequest, LoginFailure } = UserSlice.actions;
export const { LoadUserSuccess, LoadUserRequest, LoadUserFailure } =
  UserSlice.actions;
export const { LogoutSuccess, LogoutRequest, LogoutFailure } =
  UserSlice.actions;

//SELECTOR
export const getUser = (state: RootState) => state.user;

export default UserSlice.reducer;
