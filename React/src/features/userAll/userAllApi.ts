import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";
import {
  GetAllUserFailure,
  GetAllUserRequest,
  GetAllUserSucceess,
} from "./userAllSlice";

export const userAllApi = {
  getAllUser: () => async (dispatch: any) => {
    try {
      dispatch({
        type: GetAllUserRequest.toString(),
      });
      const token = JSON.parse(Cookies.get("access_token") || "");

      const { data } = await apiClient.get("/api/v1/users", {
        headers: {
          token: token,
        },
      });
      console.log(data.data.user);

      dispatch({
        type: GetAllUserSucceess.toString(),
        payload: data.data.user,
      });
    } catch (error: any) {
      dispatch({
        type: GetAllUserFailure.toString(),
        // payload: error.response.data,
      });
    }
  },
};
