// redux/Slice/CartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: 0,
    change: false,
  },
  reducers: {
    setCartValue: (state, action) => {
      state.value = action.payload;
    },
    setChange(state, action) {
      state.change = !state.change;
    },
  },
});

export const { setCartValue, setChange } = cartSlice.actions;
export default cartSlice.reducer;
