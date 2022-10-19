import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { commentFailure, commentRequest, commentSuccess } from "./commentSlice";

export const commenttApi = {
  comment: (payload: any, idPost: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: commentRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.post(
        `/api/v1/posts/${idPost}/comments`,
        payload,
        {
          headers: {
            token: token,
          },
        }
      );
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

  deleteComment:
    (idPost: any, idComment: number | null) => async (dispatch: any) => {
      try {
        dispatch({
          type: commentRequest.toString(),
        });

        const token = JSON.parse(Cookies.get("access_token") || "");

        const { data } = await apiClient.post(
          `/api/v1/posts/${idPost}/comments`,

          {
            headers: {
              token: token,
            },
          }
        );
        dispatch({
          type: commentSuccess.toString(),
          payload: data,
        });
      } catch (error: any) {
        dispatch({
          type: commentFailure.toString(),
          payload: error.response.data,
        });
      }
    },
};
