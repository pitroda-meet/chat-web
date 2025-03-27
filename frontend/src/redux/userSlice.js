import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // Load from localStorage
  token: localStorage.getItem("token") || null, // Store token separately
  otherUsers: [],
  selectedUser: null,
  onlineUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    setOtherUser: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    logoutUser: (state) => {
      state.authUser = null;
      state.token = null;
      state.otherUsers = [];
      state.selectedUser = null;
      state.onlineUsers = null;

      // Ensure localStorage is cleared
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      localStorage.removeItem("persist:root");
    },
  },
});

export const {
  setAuthUser,
  setOtherUser,
  setSelectedUser,
  setOnlineUsers,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
