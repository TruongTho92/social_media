import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { UserProfile } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: UserProfile;
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

export const getProfileUser = (state: RootState) => state.profileUser.data;

export default profileUserSlice.reducer;
