import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { PostPayloadCreate } from "~/common/types";
import {
  CreatePostFailure,
  CreatePostRequest,
  CreatePostSuccess,
  GetPostsFailure,
  GetPostsRequest,
  GetPostsSuccess,
} from "./postsSlice";

export const postsApi = {
  create: (payload: PostPayloadCreate) => async (dispatch: any) => {
    try {
      dispatch({
        type: CreatePostRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.post(`api/v1/create_post`, payload, {
        headers: {
          token: token,
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
  getAll: () => async (dispatch: any) => {
    try {
      dispatch({
        type: GetPostsRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get(`api/v1/posts`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: GetPostsSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: GetPostsFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
