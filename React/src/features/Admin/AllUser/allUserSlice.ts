import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { UserResponse } from "~/common/types";

interface StateTypes {
  loading: boolean;
  data: UserResponse[];
}

const initialState: StateTypes = {
  loading: true,
  data: [],
};

const allUserSlice = createSlice({
  name: "admin-allUser",
  initialState,
  reducers: {
    getAllUserRequest: (state) => {
      state.loading = true;
    },
    getAllUserSuccess: (state, action: PayloadAction<UserResponse[]>) => {
      state.loading = true;
      state.data = action.payload;
    },
    getAllUserFailure: (state) => {
      state.loading = true;
    },
  },
});

export const { getAllUserRequest, getAllUserSuccess, getAllUserFailure } =
  allUserSlice.actions;

// SELECTOR
export const getAllUser = (state: RootState) => state.adminAllUser.data;

export default allUserSlice.reducer;
