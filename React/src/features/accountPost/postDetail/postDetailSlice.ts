import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "~/app/store";
import { LikeDataResponse, PostDetailResponse } from "~/common/types";
import { CommentDataResponse } from "../../../common/types";

export interface StateTypes {
  loading: boolean | null;
  data: PostDetailResponse;
  like: LikeDataResponse;
  comment: CommentDataResponse;
  loadingLike: boolean | null;
  loadingComment: boolean | null;
  loadingUpdateCaption: boolean | null;
}

const initialState: StateTypes = {
  loading: true,
  data: {
    post: { id: 0, image: [], caption: "", user_id: null, created_at: "" },
    is_success: false,
    message: "",
    like: [],
    comment: [],
  },
  like: { id: null, post_id: null, user_id: null },
  comment: { id: null, post_id: null, user_id: null },
  loadingLike: null,
  loadingComment: null,
  loadingUpdateCaption: null,
};

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    // [GET]: /post/:id => GET POST ACCOUNT
    GetPostRequest: (state) => {
      state.loading = true;
    },
    GetPostSuccess: (state, action: PayloadAction<PostDetailResponse>) => {
      state.loading = false;
      state.data.post = action.payload.post;
      state.data.like = action.payload.like;
      state.data.comment = action.payload.comment;
      state.loadingUpdateCaption = false;
      state.loadingComment = false;
    },
    GetPostFailure: (state, action: PayloadAction<PostDetailResponse>) => {
      state.loading = true;
      state.data.post = action.payload.post;
    },

    // [PUT] /update_post => UPDATE POST
    UpdatePostRequest: (state) => {
      state.loadingUpdateCaption = true;
    },
    UpdatePostSuccess: (state, action: PayloadAction<PostDetailResponse>) => {
      state.loadingUpdateCaption = false;
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
    UpdatePostFailure: (state, action: PayloadAction<PostDetailResponse>) => {
      state.loadingUpdateCaption = true;
      state.data.post = action.payload.post;
    },

    likeRequest: (state) => {
      state.loadingLike = true;
    },
    likeSuccess: (state, action: PayloadAction<LikeDataResponse>) => {
      state.loadingLike = false;
      state.like = action.payload;
    },
    likeFailure: (state) => {
      state.loadingLike = true;
    },

    disLikeRequest: (state) => {
      state.loadingLike = true;
    },
    disLikeSuccess: (state, action: PayloadAction<any>) => {
      state.loadingLike = false;
      state.like = action.payload.data;
    },
    disLikeFailure: (state) => {
      state.loadingLike = true;
    },

    // COMMENT
    CommentRequest: (state) => {
      state.loadingComment = true;
    },
    CommentSuccess: (state, action: PayloadAction<CommentDataResponse>) => {
      state.loadingComment = false;
      state.comment = action.payload;
    },
    CommentFailure: (state) => {
      state.loadingComment = true;
    },
    DeleteCommentRequest: (state) => {
      state.loadingComment = true;
    },
    DeleteCommentSuccess: (
      state,
      action: PayloadAction<CommentDataResponse>
    ) => {
      state.loadingComment = false;
      state.comment = action.payload;
    },
    DeleteCommentFailure: (state) => {
      state.loadingComment = true;
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
export const getLoadingUpdateCaption = (state: RootState) =>
  state.postDetail.loadingUpdateCaption;

export const getLoadingLike = (state: RootState) =>
  state.postDetail.loadingLike;
export const getLoadingComment = (state: RootState) =>
  state.postDetail.loadingComment;

export const getPostDetail = (state: RootState) => state.postDetail.data.post;
export const getUsersLiked = (state: RootState) => state.postDetail.data.like;
export const getUsersCommented = (state: RootState) =>
  state.postDetail.data.comment;

export const getLikeData = (state: RootState) => state.postDetail.like;
export const getCommentData = (state: RootState) => state.postDetail.comment;

// REDUCER
export default postDetailSlice.reducer;
