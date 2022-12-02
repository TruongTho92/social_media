import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "~/app/store";
import { PostAccount, PostDataResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean | null;
  data: PostDataResponse;
  loadingCreated: boolean | null;
}

const initialState: StateTypes = {
  loading: true,
  data: {
    posts: [{ id: 0, image: [""], caption: "", user_id: null, created_at: "" }],
    is_success: false,
    message: "",
  },
  loadingCreated: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // [GET]: /posts => GET ALL POST ACCOUNT
    GetPostsRequest: (state) => {
      state.loading = true;
    },
    GetPostsSuccess: (state, action: PayloadAction<PostAccount[]>) => {
      state.loading = false;
      state.data.posts = action.payload;
    },
    GetPostsFailure: (state, action: PayloadAction<PostAccount[]>) => {
      state.loading = true;
      state.data.posts = action.payload;
    },

    // [POST]: /create_post => CREATE POST
    CreatePostRequest: (state) => {
      state.loadingCreated = true;
    },
    CreatePostSuccess: (state, action: PayloadAction<PostDataResponse>) => {
      state.loadingCreated = false;
      toast(action.payload.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    CreatePostFailure: (state, action: PayloadAction<PostDataResponse>) => {
      state.loadingCreated = true;
    },

    // [DELETE]: /delete_post => DELETE POST
    DeletePostRequest: (state) => {
      state.loading = true;
    },
    DeletePostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data.posts = action.payload.data;
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
export const getLoadingCreate = (state: RootState) =>
  state.posts.loadingCreated;

export const getAllPost = (state: RootState) => state.posts.data.posts;

// REDUCER
export default postsSlice.reducer;
