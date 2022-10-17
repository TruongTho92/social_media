import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "~/app/store";
import { PostDetailResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean | null;
  data: PostDetailResponse;
}

const initialState: StateTypes = {
  loading: true,
  data: {
    post: { id: null, image: "", caption: "" },
    is_success: false,
    message: "",
  },
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
} = postDetailSlice.actions;

// SELECTOR
export const getLoadingPosts = (state: RootState) => state.postDetail.loading;
export const getPostDetail = (state: RootState) => state.postDetail.data.post;

// REDUCER
export default postDetailSlice.reducer;
