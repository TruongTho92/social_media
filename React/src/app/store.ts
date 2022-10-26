import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import postDetailSlice from "~/features/accountPost/postDetail/postDetailSlice";

import UserReducer from "~/features/Auth/userSlice";
import postsSlice from "~/features/accountPost/Posts/postsSlice";
// import commentSlice from "~/features/comment/commentSlice";
import profileUserSlice from "~/features/profileUser/profileUserSlice";
import followSlice from "~/features/follow/followSlice";
import userAllSlice from "~/features/userAll/userAllSlice";
import postOfFollowingSlice from "../features/postOfFollowing/postOfFollowingSlice";

const rootReducer = combineReducers({
  // AUTH and PROFILE ACCOUNT
  user: UserReducer,

  // ALL ACCOUNT
  allAccount: userAllSlice,

  // POST FOLLOWING
  postOfFollowing: postOfFollowingSlice,

  // ACCOUNT POST
  posts: postsSlice,
  postDetail: postDetailSlice,

  // USER PROFILE
  profileUser: profileUserSlice,

  // FOLLOW
  follow: followSlice,
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
