import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import registerReducer from "~/features/Auth//register/registerSlice";
import loginReducer from "~/features/Auth/login/loginSlice";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
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
