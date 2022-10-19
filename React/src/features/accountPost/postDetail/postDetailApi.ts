import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  GetPostFailure,
  GetPostRequest,
  GetPostSuccess,
  UpdatePostFailure,
  UpdatePostRequest,
  UpdatePostSuccess,
} from "./postDetailSlice";

export const postDetailApi = {
  // [GET]: /post/:id
  getPost: (id: number | null) => async (dispatch: any) => {
    try {
      dispatch({
        type: GetPostRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get(`api/v1/posts/${id}`, {
        headers: {
          token: token,
        },
      });
      setTimeout(() => {
        dispatch({
          type: GetPostSuccess.toString(),
          payload: data.data,
        });
      }, 1000);
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

      const { data } = await apiClient.put(`api/v1/posts/${id}`, payload, {
        headers: {
          token: token,
        },
      });

      setTimeout(() => {
        dispatch({
          type: UpdatePostSuccess.toString(),
          payload: data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: UpdatePostFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
