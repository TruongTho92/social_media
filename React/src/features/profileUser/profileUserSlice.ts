import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateTypes {
  loading: boolean;
  data: any;
}

export const initialState = {
  loading: true,
  data: null,
};

const profileUserSlice = createSlice({
  name: "user-profile",
  initialState,
  reducers: {
    profileUserRequest: (state) => {
      state.loading = true;
    },
    profileUserSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    profileUserFailure: (state) => {
      state.loading = true;
    },
  },
});

export const { profileUserRequest, profileUserSuccess, profileUserFailure } =
  profileUserSlice.actions;

export default profileUserSlice.reducer;
