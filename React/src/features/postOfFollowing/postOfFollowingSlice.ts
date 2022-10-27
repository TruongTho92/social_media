import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { PostOfFollowingResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: {
    posts: PostOfFollowingResponse[];
  };
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
  },
});

export const {
  postFollowingRequest,
  postFollowingSuccess,
  postFollowingFailure,
} = postOfFollowingSlice.actions;

export const getAllPostOfFollowing = (state: RootState) =>
  state.postOfFollowing.data.posts;

export default postOfFollowingSlice.reducer;
