// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice/ItemSlice";
import userReducer from "./Slice/UserSlice";

export default configureStore({
  reducer: {
    cart: cartReducer, // Rename to 'cart' if it manages cart items
    user: userReducer,
  },
});
