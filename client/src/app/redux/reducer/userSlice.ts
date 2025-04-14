import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.userData = action.payload;
    },
    isAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { userData, isAdmin } = userSlice.actions;

export default userSlice.reducer;
