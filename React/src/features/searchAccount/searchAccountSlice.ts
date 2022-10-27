import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";

export interface StateTypes {
  loading: boolean;
  data: any;
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
    searchSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      console.log(state.data);
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

export default searchAccountSlice.reducer;
