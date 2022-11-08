import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  getAllPostFailure,
  getAllPostRequest,
  getAllPostSuccess,
} from "./AllPostSlice";

export const allPostApi = {
  getAllPost: () => async (dispatch: any) => {
    try {
      dispatch({
        type: getAllPostRequest.toString(),
      });
      const token = JSON.parse(Cookies.get("access_token") || "");
      const { data } = await apiClient.get(`/api/v1/posts_admin`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: getAllPostSuccess.toString(),
        payload: data.data.post,
      });
    } catch (error: any) {
      dispatch({
        type: getAllPostFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
