import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { UserProfile } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: UserProfile;
}

export const initialState: StateTypes = {
  loading: true,
  data: {
    user: {
      id: null,
      email: "",
      avatar: "",
      user_name: "",
      nick_name: "",
      bio: "",

      gender: "",
      authentication_token: "",
    },
    followers: [],
    following: [],
  },
};

const profileUserSlice = createSlice({
  name: "user-profile",
  initialState,
  reducers: {
    profileUserRequest: (state) => {
      state.loading = true;
    },
    profileUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.data = action.payload;
      state.data.followers = action.payload.followers;
      state.data.following = action.payload.following;
    },
    profileUserFailure: (state) => {
      state.loading = true;
    },
  },
});

export const { profileUserRequest, profileUserSuccess, profileUserFailure } =
  profileUserSlice.actions;

export const getProfileUser = (state: RootState) => state.profileUser.data;
export const getloadingProfile = (state: RootState) =>
  state.profileUser.loading;
export const getUserFollowers = (state: RootState) =>
  state.profileUser.data.followers;
export const getUserFollowings = (state: RootState) =>
  state.profileUser.data.following;
export const getLoadingProfile = (state: RootState) =>
  state.profileUser.loading;

export default profileUserSlice.reducer;
