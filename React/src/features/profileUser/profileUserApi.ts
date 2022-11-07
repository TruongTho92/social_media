import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { variables } from "~/common/variables";
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

      const { data } = await apiClient.get(`/api/v1/users/${id}`, {
        headers: {
          token: variables.token,
        },
      });

      dispatch({
        type: profileUserSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: profileUserFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
