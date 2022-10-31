import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  deleteAccountFailure,
  deleteAccountRequest,
  deleteAccountSuccess,
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
} from "./deleteAdminSlice";

export const deleteAdminApi = {
  deleteAccount: (idUser: number) => async (dispatch: any) => {
    try {
      dispatch({
        type: deleteAccountRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.delete(
        `/api/v1/delete_user_admin/${idUser}`,
        {
          headers: {
            token: token,
          },
        }
      );

      dispatch({
        type: deleteAccountSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: deleteAccountFailure.toString(),
        payload: error.response.data,
      });
    }
  },
  deletePost: (idPost: number) => async (dispatch: any) => {
    try {
      dispatch({
        type: deletePostRequest.toString(),
      });

      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.delete(
        `/api/v1/delete_post_admin/${idPost}`,
        {
          headers: {
            token: token,
          },
        }
      );

      dispatch({
        type: deletePostSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: deletePostFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
