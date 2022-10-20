import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "~/app/store";
import { LikeDataResponse, PostDetailResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean | null;
  data: PostDetailResponse;
  like: LikeDataResponse;
  comment: any;
}

const initialState: StateTypes = {
  loading: true,
  data: {
    post: { id: null, image: "", caption: "", user_id: null },
    is_success: false,
    message: "",
    likes: [],
    comments: [],
  },
  like: { id: null, post_id: null, user_id: null },
  comment: { id: null, post_id: null, user_id: null },
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    // [GET]: /post/:id => GET POST ACCOUNT
    GetPostRequest: (state) => {
      state.loading = true;
    },
    GetPostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data.post = action.payload.post;
      state.data.likes = action.payload.like;
      state.data.comments = action.payload.comment;
    },
    GetPostFailure: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data.post = action.payload.post;
    },

    // [PUT] /update_post => UPDATE POST
    UpdatePostRequest: (state) => {
      state.loading = true;
    },
    UpdatePostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data.post = action.payload.post;
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
    UpdatePostFailure: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data.post = action.payload.post;
    },

    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.like = action.payload.data;
    },
    likeFailure: (state) => {
      state.loading = true;
    },

    disLikeRequest: (state) => {
      state.loading = true;
    },
    disLikeSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.like = action.payload.data;
    },
    disLikeFailure: (state) => {
      state.loading = true;
    },

    // COMMENT
    CommentRequest: (state) => {
      state.loading = true;
    },
    CommentSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.comment = action.payload.comment;
    },
    CommentFailure: (state) => {
      state.loading = true;
    },
    DeleteCommentRequest: (state) => {
      state.loading = true;
    },
    DeleteCommentSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.comment = action.payload.comment;
    },
    DeleteCommentFailure: (state) => {
      state.loading = true;
    },
  },
});

// ACTIONS
export const {
  UpdatePostRequest,
  UpdatePostSuccess,
  UpdatePostFailure,
  GetPostRequest,
  GetPostSuccess,
  GetPostFailure,
  likeRequest,
  likeSuccess,
  likeFailure,
  disLikeRequest,
  disLikeSuccess,
  disLikeFailure,
  CommentRequest,
  CommentSuccess,
  CommentFailure,
  DeleteCommentRequest,
  DeleteCommentSuccess,
  DeleteCommentFailure,
} = postDetailSlice.actions;

// SELECTOR
export const getLoadingPosts = (state: RootState) => state.postDetail.loading;
export const getPostDetail = (state: RootState) => state.postDetail.data.post;
export const getUsersLiked = (state: RootState) => state.postDetail.data.likes;
export const getUsersCommented = (state: RootState) =>
  state.postDetail.data.comments;

export const getLikeData = (state: RootState) => state.postDetail.like;
export const getCommentData = (state: RootState) => state.postDetail.comment;

// REDUCER
export default postDetailSlice.reducer;
