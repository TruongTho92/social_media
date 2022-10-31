import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "~/app/store";
import { UserDataResponse } from "~/common/types";

export interface stateType {
  loading?: boolean;
  data: UserDataResponse;
  isAuthenticated?: boolean;
}

const initialState: stateType = {
  loading: true,
  data: {
    data: {
      user: {
        id: 0,
        email: "",
        password: "",
        password_confirmation: "",
        avatar: "",
        user_name: "",
        nick_name: "",
        bio: "",
        phone: "",
        gender: "",
        authentication_token: "",
        is_admin: false,
        is_supervisor: false,
      },
    },
    message: "",
    is_success: false,
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
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
    // UPDATE PROFILE
    UpdateProfileRequest: (state) => {
      state.loading = true;
    },
    UpdateProfileSuccess: (state, action: PayloadAction<UserDataResponse>) => {
      state.loading = false;
      state.data.message = action.payload.message;
      state.data.is_success = action.payload.is_success;
      toast(`${action.payload.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    UpdateProfileFailure: (state, action: PayloadAction<UserDataResponse>) => {
      state.loading = true;
      state.data.message = action.payload.message;
      state.data.is_success = action.payload.is_success;
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

    // LGOUT USER
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
export const {
  RegisterSuccess,
  RegisterRequest,
  RegisterFailure,
  LoginSuccess,
  LoginRequest,
  LoginFailure,
  LoadUserSuccess,
  LoadUserRequest,
  LoadUserFailure,
  LogoutSuccess,
  LogoutRequest,
  LogoutFailure,
  UpdateProfileRequest,
  UpdateProfileSuccess,
  UpdateProfileFailure,
} = userSlice.actions;

//SELECTOR
export const getAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const getUser = (state: RootState) => state.user.data.data;
export const getLoading = (state: RootState) => state.user.loading;
export const getMessage = (state: RootState) => state.user.data.message;
export const getIsSuccess = (state: RootState) => state.user.data.is_success;

export default userSlice.reducer;
