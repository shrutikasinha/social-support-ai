import { createSlice } from "@reduxjs/toolkit";

const stepFormSlice = createSlice({
  name: "stepForm",
  initialState: {
    inProgressTab: 0,
  },
  reducers: {
    setCurrentForm: (state, action) => {
      state.inProgressTab = action.payload;
    },
  },
});

export const { setCurrentForm } = stepFormSlice.actions;
export default stepFormSlice.reducer;
