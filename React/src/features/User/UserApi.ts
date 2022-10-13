import apiClient from "~/apiClient/apiClient";
import { DataUpdateUser, PayloadLogout, UserDataTypes } from "~/common/types";
import {
  LoadUserFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  LogoutFailure,
  LogoutRequest,
  LogoutSuccess,
  RegisterFailure,
  RegisterRequest,
  RegisterSuccess,
  UpdateProfileFailure,
  UpdateProfileRequest,
  UpdateProfileSuccess,
} from "./UserSlice";

import Cookies from "js-cookie";

export const registerUser =
  (payload: UserDataTypes) => async (dispatch: any) => {
    try {
      dispatch({
        type: RegisterRequest.toString(),
      });

      const { data } = await apiClient.post(`/api/v1/sign_up`, payload);

      dispatch({
        type: RegisterSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: RegisterFailure.toString(),
        payload: error.response.data,
      });
    }
  };

export const loginUser = (payload: UserDataTypes) => async (dispatch: any) => {
  try {
    dispatch({
      type: LoginRequest.toString(),
    });

    const { data } = await apiClient.post(`/api/v1/sign_in`, payload);

    Cookies.set(
      "access_token",
      JSON.stringify(data.data.user.authentication_token)
    );

    dispatch({
      type: LoginSuccess.toString(),
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LoginFailure.toString(),
      payload: error.response.data,
    });
  }
};

export const loadUser = () => async (dispatch: any) => {
  try {
    dispatch({
      type: LoadUserRequest.toString(),
    });

    const token = JSON.parse(Cookies.get("access_token") || "");

    const { data } = await apiClient.get(`/api/v1/logged_in`, {
      headers: {
        token: token,
      },
    });
    dispatch({
      type: LoadUserSuccess.toString(),
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LoadUserFailure.toString(),
      // payload: error.response.data,
    });
  }
};

export const updateProfile =
  (payload: DataUpdateUser) => async (dispatch: any) => {
    try {
      dispatch({
        type: UpdateProfileRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");
      const { data } = await apiClient.post(`/api/v1/update_user`, payload, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: UpdateProfileSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UpdateProfileFailure.toString(),
        payload: error.response.data,
      });
    }
  };

export const logoutUser = (payload: PayloadLogout) => async (dispatch: any) => {
  try {
    dispatch({
      type: LogoutRequest.toString(),
    });
    const token = JSON.parse(Cookies.get("access_token") || "");

    const { data } = await apiClient.post("/api/v1/sign_out", {
      data: payload,
      headers: {
        token: token,
      },
    });
    Cookies.remove("access_token");

    dispatch({
      type: LogoutSuccess.toString(),
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LogoutFailure.toString(),
      // payload: error.response.data,
    });
  }
};
