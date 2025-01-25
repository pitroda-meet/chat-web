import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers.includes(user._id);
  const dispatch = useDispatch();
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`p-2 m-1 hover:bg-gray-400 transition duration-300 ease-in-out rounded-lg ${
        selectedUser?._id === user._id ? "bg-gray-400" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-16 h-16 overflow-hidden border-2 border-indigo-500 rounded-full">
            <img
              src={user.profilePhoto}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800 capitalize">
            {user.fullName}
          </p>
          <p className="text-sm text-gray-600">{user.email}</p>{" "}
          {/* Display email */}
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
