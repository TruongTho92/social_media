import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateTypes {
  loading: boolean;
  data: any;
}

export const initialState = {
  loading: true,
  data: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    followRequest: (state) => {
      state.loading = true;
    },
    followSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    followFailure: (state) => {
      state.loading = true;
    },

    unFollowRequest: (state) => {
      state.loading = true;
    },
    unFollowSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    unFollowFailure: (state) => {
      state.loading = true;
    },
  },
});

export const {
  followRequest,
  followSuccess,
  followFailure,
  unFollowRequest,
  unFollowSuccess,
  unFollowFailure,
} = followSlice.actions;

export default followSlice.reducer;
