import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  CommentFailure,
  CommentRequest,
  CommentSuccess,
  DeleteCommentFailure,
  DeleteCommentRequest,
  DeleteCommentSuccess,
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
          payload: data.data,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: UpdatePostFailure.toString(),
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

  // COMMENT
  comment: (payload: any, idPost: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: CommentRequest.toString(),
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
        type: CommentSuccess.toString(),
        payload: data.data.comment,
      });
    } catch (error: any) {
      dispatch({
        type: CommentFailure.toString(),
        payload: error.response.data,
      });
    }
  },

  deleteComment:
    (idPost: any, idComment: number | null) => async (dispatch: any) => {
      console.log({ idPost, idComment });
      try {
        dispatch({
          type: DeleteCommentRequest.toString(),
        });

        const token = JSON.parse(Cookies.get("access_token") || "");

        const { data } = await apiClient.delete(
          `/api/v1/posts/${idPost}/comments/${idComment}`,

          {
            headers: {
              token: token,
            },
          }
        );
        dispatch({
          type: DeleteCommentSuccess.toString(),
          payload: data,
        });
      } catch (error: any) {
        dispatch({
          type: DeleteCommentFailure.toString(),
          payload: error.response.data,
        });
      }
    },
};
