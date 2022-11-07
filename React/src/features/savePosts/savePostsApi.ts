import apiClient from "~/apiClient/apiClient";
import { variables } from "~/common/variables";

export const savePostsApi = {
  getAllPostSave: async () => {
    const { data } = await apiClient.get(`/api/v1/storage`, {
      headers: {
        token: variables.token,
      },
    });

    return data.data.storage;
  },
  savePost: async (idPost: number) => {
    const { data } = await apiClient.post(`/api/v1/save_post/${idPost}`, {
      headers: {
        token: variables.token,
      },
    });
    return data.data.storage;
  },
  unSavePost: async (idPost: number) => {
    const { data } = await apiClient.delete(
      `/api/v1/delete_post_in_storage/${idPost}`,
      {
        headers: {
          token: variables.token,
        },
      }
    );
    return data;
  },
};
