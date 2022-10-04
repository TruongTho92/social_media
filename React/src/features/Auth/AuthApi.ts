import axios from "axios";
import apiClient from "~/apiClient/apiClient";
import { UserDataTypes } from "~/common/types";

export const registerUser = async (payload: UserDataTypes) => {
  const res = await apiClient.post(`/api/v1/sign_up`, payload);
  return res.data;
};

export const loginUser = async (payload: UserDataTypes) => {
  const res = await axios.post(`/api/v1/sign_in`, payload);
  sessionStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};
