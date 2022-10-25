import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostOfFollowingResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: PostOfFollowingResponse[];
}

const initialState = {
  loading: false,
  data: [{ user_id: 0, avatar: "", user_name: "", nick_name: "", posts: [] }],
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
      state.data = action.payload;
      console.log("====================================");
      console.log(state.data);
      console.log("====================================");
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

export default postOfFollowingSlice;
