import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  disLikeFailure,
  disLikeRequest,
  disLikeSuccess,
  likeFailure,
  likeRequest,
  likeSuccess,
} from "./likedSlice";

export const likedApi = {
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
