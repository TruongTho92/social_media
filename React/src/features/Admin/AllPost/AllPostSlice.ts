import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { PostResponse, UserResponse } from "~/common/types";

interface StateTypes {
  loading: boolean;
  data: PostResponse[];
}

const initialState: StateTypes = {
  loading: true,
  data: [],
};

const allPostSlice = createSlice({
  name: "admin-allPost",
  initialState,
  reducers: {
    getAllPostRequest: (state) => {
      state.loading = true;
    },
    getAllPostSuccess: (state, action: PayloadAction<PostResponse[]>) => {
      state.loading = true;
      state.data = action.payload;
    },
    getAllPostFailure: (state) => {
      state.loading = true;
    },
  },
});

export const { getAllPostRequest, getAllPostSuccess, getAllPostFailure } =
  allPostSlice.actions;

// SELECTOR
export const getAllPost = (state: RootState) => state.adminAllUser.data;

export default allPostSlice.reducer;
