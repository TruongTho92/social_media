import Cookies from "js-cookie";
import apiClient from "~/apiClient/apiClient";

export const savePostsApi = {
  getAllPostSave: async () => {
    const token = JSON.parse(Cookies.get("access_token") || "");
    const { data } = await apiClient.get(`/api/v1/storage`, {
      headers: {
        token: token,
      },
    });

    return data.data.storage;
  },
  savePost: async (idPost: number) => {
    const token = JSON.parse(Cookies.get("access_token") || "");
    const { data } = await apiClient.post(`/api/v1/save_post/${idPost}`, {
      headers: {
        token: token,
      },
    });
    return data.data.storage;
  },
  unSavePost: async (idPost: number) => {
    const token = JSON.parse(Cookies.get("access_token") || "");
    const { data } = await apiClient.delete(
      `/api/v1/delete_post_in_storage/${idPost}`,
      {
        headers: {
          token: token,
        },
      }
    );
    return data;
  },
};
