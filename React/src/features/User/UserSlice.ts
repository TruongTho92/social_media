import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "~/app/store";
import { UserDataResponse, UserDataTypes } from "~/common/types";
import { loadUser, loginUser, registerUser } from "./UserApi";

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

// ACTIONS THUNK
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

export const loadUserAsync = createAsyncThunk(
  "auth/loadUser",
  async (data, { rejectWithValue }) => {
    const response = await loadUser();
    return response;
  }
);

const UserSlice = createSlice({
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
          // sessionStorage.setItem(
          //   "access_token",
          //   JSON.stringify(action.payload.data.user.authentication_token)
          // );
        }
      )
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "failure";
      });

    // LOAD USER
    builder
      .addCase(loadUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadUserAsync.fulfilled,
        (state, action: PayloadAction<UserDataResponse>) => {
          state.status = "success";
          state.data = action.payload;
          state.loading = false;
          state.isAuthenticated = action.payload.is_success;
          toast(`${action.payload.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      )
      .addCase(loadUserAsync.rejected, (state, action) => {
        state.status = "failure";
        state.isAuthenticated = false;
      });
  },
});

//SELECTOR
export const getRegisterMessage = (state: RootState) => state.user.data.message;
export const getUserLogin = (state: RootState) => state.user;

export default UserSlice.reducer;
