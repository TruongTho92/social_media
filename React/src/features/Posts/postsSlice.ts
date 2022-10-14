import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "~/app/store";
import { PostDataResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean | null;
  data: PostDataResponse;
}

const initialState: StateTypes = {
  loading: null,
  data: {
    post: { id: null, image: "", caption: "" },
    posts: [{ id: null, image: "", caption: "" }],
    is_success: false,
    message: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    CreatePostRequest: (state) => {
      state.loading = true;
    },
    CreatePostSuccess: (state, action: PayloadAction<PostDataResponse>) => {
      state.loading = false;
      toast(action.payload.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    CreatePostFailure: (state, action: PayloadAction<PostDataResponse>) => {
      state.loading = true;
    },

    GetPostsRequest: (state) => {
      state.loading = true;
    },
    GetPostsSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data.posts = action.payload.post;
    },
    GetPostsFailure: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data.posts = action.payload.post;
    },
  },
});

// ACTIONS
export const {
  CreatePostRequest,
  CreatePostSuccess,
  CreatePostFailure,
  GetPostsRequest,
  GetPostsSuccess,
  GetPostsFailure,
} = postsSlice.actions;

// SELECTOR
export const getLoadingPosts = (state: RootState) => state.post.loading;
export const getAllPost = (state: RootState) => state.post.data.posts;

// REDUCER
export default postsSlice.reducer;
