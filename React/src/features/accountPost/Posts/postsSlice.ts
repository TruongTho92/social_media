import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "~/app/store";
import { PostDataResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean | null;
  data: PostDataResponse;
}

const initialState: StateTypes = {
  loading: true,
  data: {
    posts: [{ id: null, image: "", caption: "" }],
    is_success: false,
    message: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // [GET]: /posts => GET ALL POST ACCOUNT
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

    // [POST]: /create_post => CREATE POST
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

    // [DELETE]: /delete_post => DELETE POST
    DeletePostRequest: (state) => {
      state.loading = true;
    },
    DeletePostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data.posts = action.payload.data;
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
    DeletePostFailure: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data.posts = action.payload;
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
  DeletePostRequest,
  DeletePostSuccess,
  DeletePostFailure,
} = postsSlice.actions;

// SELECTOR
export const getLoadingPosts = (state: RootState) => state.posts.loading;
export const getAllPost = (state: RootState) => state.posts.data.posts;

// REDUCER
export default postsSlice.reducer;
