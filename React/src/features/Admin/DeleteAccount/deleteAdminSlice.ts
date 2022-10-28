import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { UserResponse } from "~/common/types";

interface StateTypes {
  loading: boolean;
  data: any;
}

const initialState: StateTypes = {
  loading: true,
  data: [],
};

const deleteAdminSlice = createSlice({
  name: "admin-deleteAccount",
  initialState,
  reducers: {
    deleteAccountRequest: (state) => {
      state.loading = true;
    },
    deleteAccountSuccess: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data = action.payload;
      console.log(state.data);
    },
    deleteAccountFailure: (state) => {
      state.loading = true;
    },
    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data = action.payload;
      console.log(state.data);
    },
    deletePostFailure: (state) => {
      state.loading = true;
    },
  },
});

export const {
  deleteAccountRequest,
  deleteAccountSuccess,
  deleteAccountFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
} = deleteAdminSlice.actions;

// SELECTOR
export const getAllUser = (state: RootState) => state.adminAllUser.data;

export default deleteAdminSlice.reducer;
