import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  disLikeFailure,
  disLikeRequest,
  disLikeSuccess,
  GetPostFailure,
  GetPostRequest,
  GetPostSuccess,
  likeFailure,
  likeRequest,
  likeSuccess,
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

  like: (id: number | null) => async (dispatch: any) => {
    try {
      dispatch({
        type: likeRequest.toString(),
      });
      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.post(`/api/v1/posts/${id}/likes`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: likeSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: likeFailure.toString(),
        payload: error.response.data,
      });
    }
  },

  disLike:
    (id: number | null, idLike: number | null) => async (dispatch: any) => {
      try {
        dispatch({
          type: disLikeRequest.toString(),
        });
        const token = JSON.parse(Cookies.get("access_token") || "");

        const { data } = await apiClient.delete(
          `/api/v1/posts/${id}/likes/${idLike}`,
          {
            headers: {
              token: token,
            },
          }
        );

        dispatch({
          type: disLikeSuccess.toString(),
          payload: data,
        });
      } catch (error: any) {
        dispatch({
          type: disLikeFailure.toString(),
          payload: error.response.data,
        });
      }
    },
};
