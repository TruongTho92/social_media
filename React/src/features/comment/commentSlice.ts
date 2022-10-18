import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateTypes {
  loading: boolean;
  data: any;
}

export const initialState = {
  loading: true,
  data: null,
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

export default commentSlice.reducer;
