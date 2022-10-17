import { createSlice } from "@reduxjs/toolkit";

export interface StateTypes {
  loading: boolean;
}

const initialState: StateTypes = {
  loading: false,
};

const userAllSlice = createSlice({
  name: "all-user",
  initialState,
  reducers: {
    GetAllUserRequest: (state) => {
      state.loading = true;
    },
    GetAllUserSucceess: (state) => {
      state.loading = false;
    },
    GetAllUserFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { GetAllUserRequest, GetAllUserSucceess, GetAllUserFailure } =
  userAllSlice.actions;

export default userAllSlice.reducer;
