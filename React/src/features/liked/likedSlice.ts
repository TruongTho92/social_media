import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { LikeDataResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: LikeDataResponse;
}

const initialState: StateTypes = {
  loading: true,
  data: {
    like: {
      likeId: null,
      userId: null,
      postId: null,
    },
  },
};

const likedSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    likeFailure: (state) => {
      state.loading = true;
    },

    disLikeRequest: (state) => {
      state.loading = true;
    },
    disLikeSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    disLikeFailure: (state) => {
      state.loading = true;
    },
  },
});

export const {
  likeRequest,
  likeSuccess,
  likeFailure,
  disLikeRequest,
  disLikeSuccess,
  disLikeFailure,
} = likedSlice.actions;

// SELECTOR
export const getLikeData = (state: RootState) => state.like.data.like;

export default likedSlice.reducer;
