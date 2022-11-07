import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import { variables } from "~/common/variables";
import {
  followFailure,
  followRequest,
  followSuccess,
  unFollowFailure,
  unFollowRequest,
  unFollowSuccess,
} from "./followSlice";

export const followApi = {
  follow: (userId: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: followRequest.toString(),
      });

      const { data } = await apiClient.post(`/api/v1/relationships`, userId, {
        headers: {
          token: variables.token,
        },
      });
      dispatch({
        type: followSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: followFailure.toString(),
        payload: error.response.data,
      });
    }
  },
  unFollow: (userId: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: unFollowRequest.toString(),
      });

      const { data } = await apiClient.delete(
        `/api/v1/relationships/${userId}`,
        {
          headers: {
            token: variables.token,
          },
        }
      );
      dispatch({
        type: unFollowSuccess.toString(),
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: unFollowFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
