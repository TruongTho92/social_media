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

      const { data } = await apiClient.get(`/api/v1/search?search=${name}`, {
        headers: {
          token: token,
        },
      });
      console.log(data.data);

      dispatch({
        type: searchSuccess.toString(),
        payload: data.data,
      });
    } catch (error: any) {
      dispatch({
        type: searchFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
