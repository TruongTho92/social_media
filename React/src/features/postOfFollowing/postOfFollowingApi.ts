import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
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
};
