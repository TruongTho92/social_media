import apiClient from "~/apiClient/apiClient";
import { UserDataTypes } from "~/common/types";
import {
  LoadUserFailure,
  LoadUserRequest,
  LoadUserSuccess,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  RegisterFailure,
  RegisterRequest,
  RegisterSuccess,
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
    console.log(data);
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

    const { data } = await apiClient.get(`/api/v1/users`, {
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
      payload: error.response.data,
    });
  }
};
