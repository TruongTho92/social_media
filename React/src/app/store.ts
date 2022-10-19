import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import postDetailSlice from "~/features/accountPost/postDetail/postDetailSlice";

import UserReducer from "~/features/Auth/userSlice";
import postsSlice from "~/features/accountPost/Posts/postsSlice";
import postsUserSlice from "~/features/userPost/postsUser/postsUserSlice";
import postDetailUserSlice from "~/features/userPost/postDetailUser/postDetailUserSlice";
import profileUserSlice from "~/features/profileUser/profileUserSlice";

const rootReducer = combineReducers({
  // AUTH and PROFILE ACCOUNT
  user: UserReducer,

  // ACCOUNT POST
  posts: postsSlice,
  postDetail: postDetailSlice,

  // USER POST
  postsUser: postsUserSlice,
  postDetailUser: postDetailUserSlice,

  // USER PROFILE
  profileUser: profileUserSlice,
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
