import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
      state.data = action.payload.data;
      toast(`${action.payload.message}`, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    deleteAccountFailure: (state) => {
      state.loading = true;
    },
    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data = action.payload.data;
      toast(`${action.payload.message}`, {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
