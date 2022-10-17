import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: UserDataResponse[];
}

const initialState: StateTypes = {
  loading: false,
  data: [],
};

const userAllSlice = createSlice({
  name: "all-user",
  initialState,
  reducers: {
    GetAllUserRequest: (state) => {
      state.loading = true;
    },
    GetAllUserSucceess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    GetAllUserFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { GetAllUserRequest, GetAllUserSucceess, GetAllUserFailure } =
  userAllSlice.actions;

export default userAllSlice.reducer;
