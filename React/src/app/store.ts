import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import postDetailSlice from "~/features/accountPost/postDetail/postDetailSlice";

import postsSlice from "~/features/accountPost/Posts/postsSlice";
import AllPostSlice from "~/features/Admin/AllPost/AllPostSlice";
import allUserSlice from "~/features/Admin/AllUser/allUserSlice";
import deleteAdminSlice from "~/features/Admin/DeleteAccount/deleteAdminSlice";
import UserReducer from "~/features/Auth/userSlice";
import followSlice from "~/features/follow/followSlice";
import profileUserSlice from "~/features/profileUser/profileUserSlice";
import savePostsSlice from "~/features/savePosts/savePostsSlice";
import searchAccountSlice from "~/features/searchAccount/searchAccountSlice";
import userAllSlice from "~/features/userAll/userAllSlice";
import postOfFollowingSlice from "../features/postOfFollowing/postOfFollowingSlice";

const rootReducer = combineReducers({
  // AUTH and PROFILE ACCOUNT
  user: UserReducer,

  // ALL ACCOUNT
  allAccount: userAllSlice,

  // SEACH ACCOUNT
  searchAccount: searchAccountSlice,

  // POST FOLLOWING
  postOfFollowing: postOfFollowingSlice,

  // ACCOUNT POST
  posts: postsSlice,
  postDetail: postDetailSlice,
  savePosts: savePostsSlice,

  // USER PROFILE
  profileUser: profileUserSlice,

  // FOLLOW
  follow: followSlice,

  // ADMIN
  adminAllUser: allUserSlice,
  adminAllPost: AllPostSlice,
  deleteAdminMethod: deleteAdminSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
