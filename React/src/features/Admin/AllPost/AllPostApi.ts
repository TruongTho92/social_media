import apiClient from "~/apiClient/apiClient";
import { variables } from "~/common/variables";
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

      const { data } = await apiClient.get(`/api/v1/posts_admin`, {
        headers: {
          token: variables.token,
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
