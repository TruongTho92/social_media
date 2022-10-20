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

const rootReducer = combineReducers({
  // AUTH and PROFILE ACCOUNT
  user: UserReducer,

  // ACCOUNT POST
  posts: postsSlice,
  postDetail: postDetailSlice,

  // USER PROFILE
  profileUser: profileUserSlice,

  // // COMMENT
  // comment: commentSlice,
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
