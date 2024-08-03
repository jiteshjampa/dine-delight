// redux/Slice/UserSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  loading: true, // Added loading state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      state.loading = false; // Authentication check is done
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Thunks
export const checkAuthStatus = () => async (dispatch) => {
  dispatch(setLoading(true)); // Set loading before checking
  try {
    const response = await axios.post(
      "https://dine-delight-backend.vercel.app/api/check",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      dispatch(setAuthenticated(true));

      // Assume id is part of response
    } else {
      dispatch(setAuthenticated(false));
    }
  } catch (error) {
    console.error("Error checking authentication status:", error);
    dispatch(setAuthenticated(false));
  }
};

export const { setAuthenticated, setLoading, clearUser, setId } =
  userSlice.actions;

export default userSlice.reducer;
