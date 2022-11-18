import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";
import { SaveReponse } from "~/common/types";
import { savePostsApi } from "./savePostsApi";

interface StateTypes {
  loading: boolean;
  data: SaveReponse[];
}

const initialState: StateTypes = {
  loading: true,
  data: [],
};

export const getAllPostSaveAsync = createAsyncThunk(
  "getAllPostSaveAsync",
  async () => {
    const data = await savePostsApi.getAllPostSave();
    return data;
  }
);

export const savePostAsync = createAsyncThunk(
  "savePostAsync",
  async (payload: number) => {
    const data = await savePostsApi.savePost(payload);
    return data;
  }
);
export const unSavePostAsync = createAsyncThunk(
  "unSavePostAsync",
  async (payload: number) => {
    const data = await savePostsApi.unSavePost(payload);
    return data;
  }
);

const savePostsSlice = createSlice({
  name: "savePost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder
      .addCase(getAllPostSaveAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllPostSaveAsync.fulfilled,
        (state, action: PayloadAction<SaveReponse[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getAllPostSaveAsync.rejected, (state) => {
        state.loading = true;
      });

    //SAVE
    builder
      .addCase(savePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(savePostAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(savePostAsync.rejected, (state) => {
        state.loading = true;
      });

    // UNSAVE
    builder
      .addCase(unSavePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        unSavePostAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
        }
      )
      .addCase(unSavePostAsync.rejected, (state) => {
        state.loading = true;
      });
  },
});

// ACTIONS

// SELECTOR
export const getAllPostSave = (state: RootState) => state.savePosts.data;
export const getLoadingSave = (state: RootState) => state.savePosts.loading;

export default savePostsSlice.reducer;
