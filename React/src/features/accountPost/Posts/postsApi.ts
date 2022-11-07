import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { PostPayloadCreate } from "~/common/types";
import { variables } from "~/common/variables";
import {
  CreatePostFailure,
  CreatePostRequest,
  CreatePostSuccess,
  DeletePostFailure,
  DeletePostRequest,
  DeletePostSuccess,
  GetPostsFailure,
  GetPostsRequest,
  GetPostsSuccess,
} from "./postsSlice";

export const postsApi = {
  // [GET]: /posts
  getAll: (id: number | null) => async (dispatch: any) => {
    try {
      dispatch({
        type: GetPostsRequest.toString(),
      });

      const { data } = await apiClient.get(`api/v1/posts_of_user/${id}`, {
        headers: {
          token: variables.token,
        },
      });

      setTimeout(() => {
        dispatch({
          type: GetPostsSuccess.toString(),
          payload: data.data.post,
        });
      }, 1000);
    } catch (error: any) {
      dispatch({
        type: GetPostsFailure.toString(),
        payload: error.response.data,
      });
    }
  },

  // [POST]: /create_post
  create: (payload: PostPayloadCreate) => async (dispatch: any) => {
    try {
      dispatch({
        type: CreatePostRequest.toString(),
      });

      const { data } = await apiClient.post(`api/v1/posts`, payload, {
        headers: {
          token: variables.token,
        },
      });

      dispatch({
        type: CreatePostSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: CreatePostFailure.toString(),
        payload: error.response.data,
      });
    }
  },

  // [DELETE]: /delete_post
  delete: (id: number | null) => async (dispatch: any) => {
    try {
      dispatch({
        type: DeletePostRequest.toString(),
      });

      const { data } = await apiClient.delete(`api/v1/posts/${id}`, {
        headers: {
          token: variables.token,
        },
      });

      setTimeout(() => {
        dispatch({
          type: DeletePostSuccess.toString(),
          payload: data,
        });
      }, 500);
    } catch (error: any) {
      dispatch({
        type: DeletePostFailure.toString(),
        // payload: error.response.data,
      });
    }
  },
};
