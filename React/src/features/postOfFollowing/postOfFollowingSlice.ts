import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import {
  CommentDataResponse,
  LikeDataResponse,
  PostOfFollowingResponse,
} from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: {
    posts: PostOfFollowingResponse[];
  };
  like: LikeDataResponse;
  comment: CommentDataResponse;
}

const initialState: StateTypes = {
  loading: false,
  data: {
    posts: [
      {
        id: 0,
        user_id: 0,
        avatar: "",
        user_name: "",
        nick_name: "",
        image: "",
        caption: "",
        like: [],
        comment: [],
      },
    ],
  },
  like: { id: null, post_id: null, user_id: null },
  comment: { id: null, post_id: null, user_id: null },
};

const postOfFollowingSlice = createSlice({
  name: "postOfFollowing",
  initialState,
  reducers: {
    postFollowingRequest: (state) => {
      state.loading = true;
    },
    postFollowingSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data.posts = action.payload.post;
    },
    postFollowingFailure: (state) => {
      state.loading = true;
    },

    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action: PayloadAction<LikeDataResponse>) => {
      state.loading = false;
      state.like = action.payload;
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
  },
});

export const {
  postFollowingRequest,
  postFollowingSuccess,
  postFollowingFailure,
  likeRequest,
  likeSuccess,
  likeFailure,
  disLikeRequest,
  disLikeSuccess,
  disLikeFailure,
} = postOfFollowingSlice.actions;

// SELECTOR
export const getLikePostMain = (state: RootState) => state.postDetail.like;
export const getAllPostOfFollowing = (state: RootState) =>
  state.postOfFollowing.data.posts;
export const getLoadingPostFollowing = (state: RootState) =>
  state.postOfFollowing.loading;

export default postOfFollowingSlice.reducer;
