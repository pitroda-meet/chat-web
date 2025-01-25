import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null,
  otherUsers: [],
  selectedUser: null,
  onlineUsers: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
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
  },
});

export const { setAuthUser, setOtherUser, setSelectedUser, setOnlineUsers } =
  userSlice.actions;

export default userSlice.reducer;
