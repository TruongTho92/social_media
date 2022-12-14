import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  searchFailure,
  searchRequest,
  searchSuccess,
} from "./searchAccountSlice";

export const searchAccountApi = {
  search: (name: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: searchRequest.toString(),
      });
      const token = JSON.parse(Cookies.get("access_token") || "");
      const { data } = await apiClient.post(`/api/v1/search?name=${name}`, {
        headers: {
          token: token,
        },
      });

      setTimeout(() => {
        dispatch({
          type: searchSuccess.toString(),
          payload: data.data.user,
        });
      }, 500);
    } catch (error: any) {
      dispatch({
        type: searchFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
