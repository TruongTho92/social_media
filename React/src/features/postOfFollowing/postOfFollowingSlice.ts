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
    postFollowingSuccess: (
      state,
      action: PayloadAction<PostOfFollowingResponse[]>
    ) => {
      state.loading = false;
      // state.data.concat(action.payload);
    },
    postFollowingFailure: (state) => {
      state.loading = true;
    },
  },
});

export default postOfFollowingSlice;
