import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { loadUser } from "./UserApi";

export interface UserData {
  email: string;
  password: string;

  is_login: boolean;
}

export interface stateType {
  status: "idle" | "loading" | "success" | "failure";
  data: UserData;
}

export const loadUserAsync = createAsyncThunk("auth/loadUser", async () => {
  const response = await loadUser();
  return response;
});

const initialState: stateType = {
  status: "idle",
  data: {
    email: "",
    password: "",
    is_login: false,
  },
};

const registerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(loadUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loadUserAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = "success";
          state.data = action.payload;
        }
      )
      .addCase(loadUserAsync.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export const getCurrentUser = (state: RootState) => state.user.data;

export default registerSlice.reducer;
