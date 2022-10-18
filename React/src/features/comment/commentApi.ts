import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { commentFailure, commentRequest, commentSuccess } from "./commentSlice";

export const commnetApi = {
  comment: () => async (dispatch: any) => {
    try {
      dispatch({
        type: commentRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.post(`/api/v1/`, {
        headers: {
          token: token,
        },
      });
      dispatch({
        type: commentSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: commentFailure.toString(),
        // payload: error.response.data,
      });
    }
  },
};