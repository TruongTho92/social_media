import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  getAllUserFailure,
  getAllUserRequest,
  getAllUserSuccess,
} from "./allUserSlice";

export const allUserApi = {
  getAllUser: () => async (dispatch: any) => {
    try {
      dispatch({
        type: getAllUserRequest.toString(),
      });
      const token = JSON.parse(Cookies.get("access_token") || "");
      const { data } = await apiClient.get(`/api/v1/users_admin`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: getAllUserSuccess.toString(),
        payload: data.data.user,
      });
    } catch (error: any) {
      dispatch({
        type: getAllUserFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
