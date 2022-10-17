import { createSlice } from "@reduxjs/toolkit";
import { PostDataResponse } from "~/common/types";

export interface StateTypes {
  loading: boolean;
  data: PostDataResponse;
}

const initialState: StateTypes = {
  loading: false,
  data: {
    post: { id: null, image: "", caption: "" },
    posts: [{ id: null, image: "", caption: "" }],
    is_success: false,
    message: "",
  },
};

const postsUserSlice = createSlice({
  name: "posts-user",
  initialState,
  reducers: {},
});

export default postsUserSlice.reducer;
