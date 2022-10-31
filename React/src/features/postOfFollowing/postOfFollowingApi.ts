import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  disLikeFailure,
  disLikeRequest,
  disLikeSuccess,
  likeFailure,
  likeRequest,
  likeSuccess,
  postFollowingFailure,
  postFollowingRequest,
  postFollowingSuccess,
} from "./postOfFollowingSlice";

export const postOfFollowingApi = {
  getPostFollowing: () => async (dispatch: any) => {
    try {
      dispatch({
        type: postFollowingRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get(`/api/v1/posts_of_following`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: postFollowingSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: postFollowingFailure.toString(),
        payload: error.response.data,
      });
    }
  },
  // LIKE
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
        payload: data.data,
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
