import apiClient from "~/apiClient/apiClient";
import { UserDataTypes } from "~/common/types";

export const registerUser = async (payload: UserDataTypes) => {
  const res = await apiClient.post(`/api/v1/sign_up`, payload);
  return res.data;
};

export const loginUser = async (payload: UserDataTypes) => {
  const res = await apiClient.post(`/api/v1/sign_in`, payload);

  return res.data;
};

export const loadUser = async () => {
  const res = await apiClient.get(`/api/v1/load-user`);
  return res.data;
};
