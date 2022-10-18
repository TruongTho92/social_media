import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { followFailure, followRequest, followSuccess } from "./followSlice";

export const commnetApi = {
  follow: () => async (dispatch: any) => {
    try {
      dispatch({
        type: followRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.post(`/api/v1/`, {
        headers: {
          token: token,
        },
      });
      dispatch({
        type: followSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: followFailure.toString(),
        // payload: error.response.data,
      });
    }
  },
};
