import apiClient from "~/apiClient/apiClient";
import { variables } from "~/common/variables";
import {
  getAllUserFailure,
  getAllUserRequest,
  getAllUserSuccess,
} from "./allUserSlice";

export const allUserApi = {
  getAllUser: () => async (dispatch: any) => {
    try {
      dispatch({
        type: getAllUserRequest.toString(),
      });

      const { data } = await apiClient.get(`/api/v1/users_admin`, {
        headers: {
          token: variables.token,
        },
      });

      dispatch({
        type: getAllUserSuccess.toString(),
        payload: data.data.user,
      });
    } catch (error: any) {
      dispatch({
        type: getAllUserFailure.toString(),
        payload: error.response.data,
      });
    }
  },
};
