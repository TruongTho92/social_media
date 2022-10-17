import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import postsReducer from "~/features/Posts/postsSlice";
import postsUserReducer from "~/features/postsUser/postsUserSlice";
import UserReducer from "~/features/User/userSlice";

const rootReducer = combineReducers({
  user: UserReducer,
  post: postsReducer,
  postuser: postsUserReducer,
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
