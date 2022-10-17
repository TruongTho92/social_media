import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import postDetailSlice from "~/features/AccountPost/postDetail/postDetailSlice";
import postsUserSlice from "~/features/UserPost/postsUser/postsUserSlice";

import postsUserReducer from "~/features/UserPost/postsUser/postsUserSlice";
import UserReducer from "~/features/User/userSlice";
import postDetailUserSlice from "../features/UserPost/postDetail/postDetailSlice";

const rootReducer = combineReducers({
  user: UserReducer,

  // ACCOUNT
  posts: postsUserSlice,
  postDetail: postDetailSlice,

  // USER
  postuser: postsUserReducer,
  postDetailUser: postDetailUserSlice,
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
