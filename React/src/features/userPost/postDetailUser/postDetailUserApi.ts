import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  GetPostFailure,
  GetPostRequest,
  GetPostSuccess,
  UpdatePostFailure,
  UpdatePostRequest,
  UpdatePostSuccess,
} from "./postDetailUserSlice";

export const postDetailApi = {
  // [GET]: /post/:id
  getPost: (id: number) => async (dispatch: any) => {
    try {
      dispatch({
        type: GetPostRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get(`api/v1/post/${id}`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: GetPostSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: GetPostFailure.toString(),
        payload: error.response.data,
      });
    }
  },

  // [PUT]: /update_post/:id
  update: (id: number | null, payload: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: UpdatePostRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.put(
        `api/v1/update_post/${id}`,
        payload,
        {
          headers: {
            token: token,
          },
        }
      );

      dispatch({
        type: UpdatePostSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: UpdatePostFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
