import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { SearchUserResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: SearchUserResponse[];
}

const initialState: StateTypes = {
  loading: true,
  data: [],
};

const searchAccountSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchRequest: (state) => {
      state.loading = true;
    },
    searchSuccess: (state, action: PayloadAction<SearchUserResponse[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    searchFailure: (state) => {
      state.loading = true;
    },
  },
});

// ACTIONS
export const { searchRequest, searchSuccess, searchFailure } =
  searchAccountSlice.actions;

// SELECTOR
export const getSearchResults = (state: RootState) => state.searchAccount.data;
export const getLoadingSearch = (state: RootState) =>
  state.searchAccount.loading;

export default searchAccountSlice.reducer;
