import apiClient from "~/apiClient/apiClient";

export const loadUser = async () => {
  const res = await apiClient.get(`/me`);
  return res.data;
};
