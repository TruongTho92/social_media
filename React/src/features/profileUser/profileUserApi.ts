import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  profileUserFailure,
  profileUserRequest,
  profileUserSuccess,
} from "./profileUserSlice";

export const profileUserApi = {
  getProfileUser: (id: number | null) => async (dispatch: any) => {
    try {
      dispatch({
        type: profileUserRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get(`/api/v1/users/${id}`, {
        headers: {
          token: token,
        },
      });
      setTimeout(() => {
        dispatch({
          type: profileUserSuccess.toString(),
          payload: data.data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: profileUserFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
