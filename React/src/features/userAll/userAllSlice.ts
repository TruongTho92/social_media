import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { AllAccountResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: AllAccountResponse[];
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
    GetAllUserSucceess: (
      state,
      action: PayloadAction<AllAccountResponse[]>
    ) => {
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

export const getAllUser = (state: RootState) => state.allAccount.data;

export default userAllSlice.reducer;
