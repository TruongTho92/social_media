import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { PostPayloadCreate } from "~/common/types";
import {
  CreatePostFailure,
  CreatePostRequest,
  CreatePostSuccess,
  DeletePostFailure,
  DeletePostRequest,
  DeletePostSuccess,
  GetPostFailure,
  GetPostRequest,
  GetPostsFailure,
  GetPostsRequest,
  GetPostsSuccess,
  GetPostSuccess,
  UpdatePostFailure,
  UpdatePostRequest,
  UpdatePostSuccess,
} from "./postsSlice";

export const postsApi = {
  // [GET]: /posts
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

  // [POST]: /create_post
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

  // [PUT]: /update_post/:id
  update: (id: number) => async (dispatch: any) => {
    try {
      dispatch({
        type: UpdatePostRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get(`api/v1/update_post/${id}`, {
        headers: {
          token: token,
        },
      });

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

  // [DELETE]: /delete_post
  delete: (id: number) => async (dispatch: any) => {
    try {
      dispatch({
        type: DeletePostRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get(`api/v1/delete_post/${id}`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: DeletePostSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: DeletePostFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
