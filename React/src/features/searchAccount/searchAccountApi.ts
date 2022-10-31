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

      const { data } = await apiClient.post(`/api/v1/search?search=${name}`, {
        headers: {
          token: token,
        },
      });

      dispatch({
        type: searchSuccess.toString(),
        payload: data.data.user,
      });
    } catch (error: any) {
      dispatch({
        type: searchFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
