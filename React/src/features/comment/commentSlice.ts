import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { CommentDataResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: CommentDataResponse;
}

export const initialState = {
  loading: true,
  data: {
    id: null,
    post_id: null,
    user_id: null,
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentRequest: (state) => {
      state.loading = true;
    },
    commentSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    commentFailure: (state) => {
      state.loading = true;
    },
  },
});

export const { commentRequest, commentSuccess, commentFailure } =
  commentSlice.actions;

export const getCommentData = (state: RootState) => state.comment.data;

export default commentSlice.reducer;
